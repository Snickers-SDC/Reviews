const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./database/mongoConnection.js');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
