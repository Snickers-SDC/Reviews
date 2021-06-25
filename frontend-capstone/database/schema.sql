DROP DATABASE IF EXISTS Sdc;
CREATE DATABASE Sdc;
USE Sdc;

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  rating INT,
  date DATETIME(4),
  summary VARCHAR(50),
  body VARCHAR(1000),
  recommended VARCHAR(5),
  reported VARCHAR(5),
  reviewer_name VARCHAR(75),
  reviewer_email VARCHAR(75),
  response VARCHAR(500),
  helpfulness INT
);

CREATE TABLE photos (
  id INT,
  review_id INT,
  url VARCHAR(300)
  -- FOREIGN KEY (reviewId) REFERENCES reviews (review_id)
);

CREATE TABLE reviewCharacteristic (
  id INT AUTO_INCREMENT PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  _value INT
);

CREATE TABLE characteristics (
  id INT,
  product_id INT,
  name VARCHAR(10)
);