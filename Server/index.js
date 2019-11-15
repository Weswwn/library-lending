const express = require('express')
const app = express();
const port = 3000;
const morgan = require('morgan');
const db = require('../database/connector.js');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json());
app.use(morgan('dev'));
app.use('/' , express.static('public'));

app.get('/books' , (req, res) => {
  let queryString = 'SELECT * FROM books';
  db.client.query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error ? error.stack : result.rows[0].message);
    })
})

app.post('/rent' , (req, res) => {
  const { userName, membershipNumber, bookID, dateRented, durationOfRental, returnDate} = req.body;
  db.client.query('SELECT username from users where membershipnumber = $1 AND username = $2', [membershipNumber, userName])
    .then((response) => {
      if (response.rows.length === 0) {
        res.send(false);
      } else {
        let queryString = `INSERT INTO borrowed(username, membershipnumber, bookid, daterented, durationofrental, returndate)
        VALUES($1, $2 ,$3, $4, $5, $6)`;
        db.client.query(queryString, 
          [userName, membershipNumber, bookID, dateRented, durationOfRental, returnDate])
          .then((results) => {
            res.send(results);
            changeBookStatus(bookID, true);
          })
          .catch((err) => {
            res.status(400).send(err);
          })
      }
    })
    .catch((error) => {
      res.send(error);
    })
})

app.put('/return', (req, res) => {
  let { membershipNumber, bookID } = req.body;
  let queryString = 'DELETE FROM borrowed WHERE membershipnumber = $1 AND bookid = $2'
  db.client.query(queryString, [membershipNumber, bookID])
    .then((result) => {
      if (result.rowCount === 0) {
        res.send(false);
      } else {
        res.send(true);
        changeBookStatus(bookID, false)
      }
    })
    .catch((error) => {
      res.send(error);
    })
})



// ====================== HELPER FUNCTION =========================

let changeBookStatus = (bookID, status) => {
    let queryString = 'UPDATE books SET bookstatus = $1 WHERE bookid = $2'
    db.client.query(queryString, [status, bookID])
        .then((results) => {
            console.log(results);
        })
        .catch((error) => {
            console.log(error);
        })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))