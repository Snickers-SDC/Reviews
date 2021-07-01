DROP DATABASE IF EXISTS Sdc;
CREATE DATABASE Sdc;
USE Sdc;

CREATE TABLE reviews (
  review_id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NUll,
  rating SMALLINT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(150),
  body VARCHAR(1000) NOT NULL,
  recommended BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT false,
  reviewer_name VARCHAR(40) NOT NULL,
  reviewer_email VARCHAR(50) NOT NULL,
  response VARCHAR(150),
  helpfulness SMALLINT DEFAULT 0,
  -- photo_id INTEGER NOT NULL PRIMARY KEY,
  -- url VARCHAR(250) NOT NULL
);

CREATE TABLE photos (
  id INTEGER NOT NULL PRIMARY KEY,
  review_id INTEGER NOT NULL REFERENCES reviews(review_id),
  url VARCHAR(250) NOT NULL
);

CREATE TABLE characteristic_reviews (
  id INTEGER NOT NULL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics(characteristic_id),
  review_id INTEGER NOT NULL REFERENCES reviews(review_id),
  value SMALLINT NOT NULL
);

CREATE TABLE characteristics (
  characteristic_id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(10) NOT NULL
);


/*
COPY [table_name] FROM '/home/imaycode/hackreactor/senior-phase/Reviews/[file_name].csv' DELIMITER ',' CSV HEADER;
\copy characteristics FROM '/Users/jacobward/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;
\copy characteristic_reviews FROM '/Users/jacobward/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
\copy reviews FROM '/Users/jacobward/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;
\copy photos FROM '/Users/jacobward/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;
*/