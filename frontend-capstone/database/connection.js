var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "SDC"
  password: "Dn9nskfbp"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});