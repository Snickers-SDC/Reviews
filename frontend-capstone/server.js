const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { db } = require('./dbConnect');

app.use(express.static('dist'));
app.use(express.json())

app.get('/reviews/?', (req, res) => {
  // res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  const queryObject = {
    page: Number(req.query.page) || 1,
    count: Number(req.query.count) || 5,
    sort: req.query.sort || 'relevant',
    product_id: Number(req.query.id),
  };
  const responseObject = {
    product: queryObject.product_id,
    page: queryObject.page,
    count: queryObject.count,
    results: [],
  };
  // console.log('this is the params', queryObject)
  db.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    const fetch = {
      name: 'fetch-reviews',
      text: 'SELECT * FROM reviews where product_id = $1',
      values: [queryObject.product_id],
    }
    client.query(fetch)
      .then(async (reviews) => {
        release()
        reviews = reviews.rows;
        for await (review of reviews) {
          let reviewID = review.review_id;
          let photosArr = null;
          await client.query(`SELECT id, url FROM photos where review_id=${reviewID};`)
            .then((photos) => {
              responseObject.results.push(
                {
                  review_id: review.review_id,
                  rating: review.rating,
                  summary: review.summary,
                  recommend: review.recommend,
                  response: review.response,
                  body: review.body,
                  date: review.to_timestamp,
                  reviewer_name: review.reviewer_name,
                  helpfulness: review.helpfulness,
                  photos: photos.rows,
                },
              );
            })
        }
      })
      .then(() => {
        res.status(200).send(responseObject)
      })
      .catch(() => {
        res.status(500).send('error getting reviews');
      })
  })

});

app.get('/reviews/meta/?', (req, res) => {
  let response = {
    product_id: req.query.id,
    characteristics: {},
    ratings: {},
    recommended: {}
  }
  db.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    const char = {
      name: 'fetch-characteristics',
      text: 'SELECT characteristic_id, name FROM characteristics WHERE product_id = $1',
      values: [Number(req.query.id)],
    }
    client.query(`select rating, recommend from reviews where product_id = ${Number(req.query.id)}`)
      .then((ratingsData) => {
        const ratings = {}
        const recommended = {}
        let allRatings = ratingsData.rows
        for (let i = 0; i < allRatings.length; i++) {
          !ratings[allRatings[i].rating] ? ratings[allRatings[i].rating] = 1 : ratings[allRatings[i].rating] += 1;
          !recommended[allRatings[i].recommend] ? recommended[allRatings[i].recommend] = 1 : recommended[allRatings[i].recommend] += 1;
        }

        response.recommended = recommended;
        response.ratings = ratings;
      })
      .catch(() => {
        res.status(500).send('error collecting ratings and such')
      })
      .then(async () => {
        await client.query(char)
          .then(async (chars) => {
            let fetchedChars = chars.rows;
            let count = fetchedChars.length
            for await (let info of fetchedChars) {
              let name = info.name;
              let id = info.characteristic_id;
              response.characteristics[name] = { id: id };
              await client.query(`SELECT value FROM characteristic_reviews where characteristic_id = ${id};`)
                .then(async (val) => {
                  let value = 0;
                  let valueArr = val.rows;
                  if (val.rows.length > 0) {
                    for await (let j of valueArr) {
                      if (typeof j.value === 'number') {
                        value += j.value
                      }
                    }
                    response.characteristics[name].value = `${(value / valueArr.length).toFixed(4)}`
                  } else
                    response.characteristics[name].value = `0.0000`
                })
                .catch((err) => { console.log(err) })
            }
          })
          .catch(() => {
            res.status(500).send('error collecting characteristics for a product')
          })
        release();
      })
      .then(() => {
        res.status(200).send(response)
      })
  })
});

app.put('/reviews/helpful/?', (req, res) => {
  db.connect((err, client, release) => {
    if (err) {
      console.log('there has been an error in connecting to database', err.stack)
    }
    const helpMark = {
      name: 'mark_helpful',
      text: 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1',
      values: [Number(req.query.id)]
    }
    client.query(helpMark, (err, success) => {
      release();
      if (err) {
        console.log('could not update helpfulness for some reason')
      } else {
        res.status(200).send('success');
      }
    })
  })
})

app.put('/reviews/report/?', (req, res) => {
  db.connect((err, client, release) => {
    if (err) {
      console.log('there has been an error in connecting to database', err.stack)
    }
    const report = {
      name: 'reported',
      text: 'UPDATE reviews SET reported = NOT reported WHERE review_id = $1',
      values: [Number(req.query.id)]
    }
    client.query(report, (err, success) => {
      release();
      if (err) {
        console.log('could not report review', err)
      } else {
        console.log('success')
      }
    })
  })
  res.status(200).send('success');
})

app.post('/reviews/:id', (req, res) => {
  let recommend = 1
  req.body.recommend ? recommend = 1 : recommend = 0
  db.connect((err, client, release) => {
    if (err) {
      console.log('there has been an error in connecting to database', err.stack)
    }
    client.query('SELECT max(review_id) FROM reviews;')
      .then((currentMax) => {
        // console.log(currentMax, '----------------------')
        currentMax = currentMax.rows[0].max + 1;
        const review = {
          name: 'post-review',
          text: 'INSERT INTO reviews (review_id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          values: [currentMax, Number(req.params.id), req.body.rating, Date.now(), req.body.summary, req.body.body, recommend, req.body.name, req.body.email]
        }
        // console.log(review.values)
        client.query(review)
          .catch(() => { console.log('error posting review') })

        client.query('SELECT max(id) FROM photos;')
          .then(async (max) => {
            max = max.rows[0].max;
            for await (photo of req.body.photos) {
              max += 1;
              const picture = {
                name: 'insert-picture',
                text: 'INSERT INTO photos (id, review_id, url) values($1, $2, $3)',
                values: [max, currentMax, photo]
              }
              // console.log(picture.values)
              client.query(picture)
                .catch(() => { console.log('error posting photos') })
            }
          })
          .catch(() => { console.log('error getting max photo') })

        client.query('SELECT max(id) FROM characteristic_reviews;')
          .then(async (currentMaxCharReview) => {
            currentMaxCharReview = currentMaxCharReview.rows[0].max;
            let cArray = Object.keys(req.body.characteristics)
            for await (let reviews of cArray) {
              currentMaxCharReview += 1
              const characteristicReview = {
                name: 'insert-characteristic_review',
                text: 'INSERT INTO characteristic_reviews (id, characteristic_id, review_id , value) values($1, $2, $3, $4)',
                values: [currentMaxCharReview, Number(reviews), currentMax, Number(req.body.characteristics[reviews])]
              }
              // INSERT INTO characteristic_review (id, characteristic_id, review_id , value) values(19327576, 1, 5774953, 5)
              // console.log(characteristicReview.values)
              client.query(characteristicReview)
                .catch(() => { console.log('error posting characteristic review') })
            }
          })
          .catch(() => { console.log('error getting max characteristic_review') })

      })
      .catch(() => { console.log('something failed') })

    release()
  })
  res.status(200).send('success');
})
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);



/*
O - head node linked list
I - head node two linked list
C - all values are positive integars (no strings or whatever)
  - each node has a value and a next property
E - none

example of a node...
{
value: 6
next: 5, ---(tail has next of null)
}
ASK FOR HELPERS NEXT TIME...
  makeNode(value) ---> object with next value (its a node)
  {val: value, next: null}


List1: 5->6->3  // represents number 365
List2: 8->4->2 //  represents number 248
Output: Resultant list: 3->1->6  // represents number 613

string += each value of a linked list
  List1: 5->6->3  // represents number 365
    iterate and collect values and += string (while loop// while current.next !== null)
  -'5'
  -'56'
  -'563' -----NOW REVERSE AND MAKE NUMBER
    string.split('').reverse().join() ---> gives us a reverse number string
    Number(string)
      -365
    -repeat process with List2: 8->4->2
      -365 & 248
        -365 + 248
        -613 ----------------needs to be 3 -> 1-> 6
          take number and make string for iteration using toString(number)
          -call makeNode on each value
          iterate for loop (iterating over string)
            counter
            call makeNode( on the current Number(letter)) --- this gives us a head node the first time
              -- how to make next node
              var list = {next: null}
              for (let i = 0: i < arr.length; i++) {
                list.next = makeNode(arr[i]);
                list = list.next;
              }
              while(list.next !== null) {


              }

*/




