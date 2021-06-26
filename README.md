# Reviews
## steps for ETL process: 
  - 1. \copy characteristics FROM '/Users/jacobward/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER; 
  - 2. \copy characteristic_reviews FROM '/Users/jacobward/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
  - 3. \copy reviews FROM '/Users/jacobward/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;
  - 4. \copy photos FROM '/Users/jacobward/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;
 
 ### then alter the table for reviews to have strings to later be converted into numbers
  - 1. alter table reviews alter column recommend type varchar(8);
  - 2. UPDATE reviews set recommend = '0' where recommend = 'false';
  - 3. UPDATE reviews set recommend = '1' where recommend = 'true';
  
 #### next change the data to numbers instead of strings
  -  1. ALTER TABLE reviews ALTER COLUMN recommend TYPE SMALLINT USING recommend::integer;
