import React from 'react';
import ReviewList from './reviewList.js';
import RatingsBreakdown from './ratingsBreakdown.js';
import apiMaster from '../../apiMaster.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      filtered: [],
      currentProductRatings: [],
      recommendProduct: 0,
    };
    this.getRatings = this.getRatings.bind(this);
    this.getRecommendation = this.getRecommendation.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentProductID !== this.props.currentProductID) {
      apiMaster
        .getReviewsOfProduct(this.props.currentProductID, 20)
        .then(({ data }) => {
          let ratings = this.getRatings(data.results);
          let recommend = this.getRecommendation(data.results);
          this.setState({
            reviews: data.results,
            currentProductRatings: ratings,
            recommendProduct: recommend,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  getRatings(reviewsArray) {
    return reviewsArray.map((review) => {
      return review.rating;
    });
  }

  filterReviews(rating) {
    let filteredReviews = [];
    for (var count in rating) {
      let countFilter = this.state.reviews.filter((review) => {
        return Number(review.rating) === Number(count);
      });
      filteredReviews = filteredReviews.concat(countFilter);
    }
    this.setState({
      filtered: filteredReviews,
    });
  }

  getRecommendation(reviewsArray) {
    let numRec = reviewsArray.reduce((num, review) => {
      if (review.recommend === 1) num++;
      return num;
    }, 0);
    let length = reviewsArray.length;
    return (numRec / length) * 100;
  }

  render() {
    return (
      <div id="reviews-ratings-container">
        <div className="widget-headings">Ratings and Reviews</div>
        <ReviewList
          currentProductCharacteristics={
            this.props.currentRating.characteristics
          }
          filteredReviews={this.state.filtered}
          currentProductName={this.props.currentProductName}
          reviews={this.state.reviews}
          currentProductID={this.props.currentProductID}
        />
        <RatingsBreakdown
          currentRating={this.props.currentRating}
          recommend={this.state.recommendProduct}
          currentProductRatings={this.state.currentProductRatings}
          averageRating={this.props.averageRating}
          handleFilter={this.filterReviews}
        />
      </div>
    );
  }
}

export default RatingsReviews;
