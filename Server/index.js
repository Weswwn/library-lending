const express = require('express')
const app = express();
const port = 3000;
const morgan = require('morgan');
const db = require('../database/connector.js');

app.use(morgan('dev'));
app.use('/' , express.static('public'));

app.get('/books' , (req, res) => {
    let queryString = 'SELECT books.bookTitle, books.bookStatus FROM books'
    db.client.query(queryString, (err, result) => {
        if (err) {
            console.log(err ? err.stack : result.rows[0].message)
            res.send(err);
        } else {
            console.log(result.rows);
            res.send(result.rows);
        }
    })
})

app.post('/rental' , (req, res) => {
    let queryString = `INSERT INTO borrowed(username, membershipNumber, bookID, dateRented, durationOfRental, returnDate)
    VALUES(?, ? ,?, ?, ?, ?)`
    db.client.query(queryString, [], (err, results) => {

    });
})

// app.update('/return', (req, res) => {

// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))