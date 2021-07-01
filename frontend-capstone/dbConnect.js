const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
// console.log(process.env.USERR)

const db = new Pool({
  // host: 'localhost',
  host: process.env.HOST,
  // user: 'postgres',
  user: process.env.USERR,
  // password: '3863',
  password: process.env.PASSWORD,
  // database: 'SDC',
  database: process.env.DATABASE,
  // port: 5432,
  port: process.env.PORT,
})

module.exports = {
  db,
}

