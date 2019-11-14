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
    let queryString = 'SELECT * FROM books'
    db.client.query(queryString, (err, result) => {
        if (err) {
            console.log(err ? err.stack : result.rows[0].message)
        } else {
            res.send(result.rows);
        }
    })
})

app.post('/rent' , (req, res) => {
    console.log(req.params, req.body);
    let queryString = `INSERT INTO borrowed(username, membershipNumber, bookID, dateRented, durationOfRental, returnDate)
    VALUES($1, $2 ,$3, $4, $5, $6)`
    db.client.query(queryString, 
        [req.params.userName, req.params.membershipNumber, req.params.bookID, req.params.dateRented, req.params.durationOfRental, req.params.returnDate], 
        (err, results) => {
            if (err) res.send(err);
            res.send(results);
    });
})

// app.update('/return', (req, res) => {

// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))