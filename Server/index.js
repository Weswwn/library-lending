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
    const { userName, membershipNumber, bookID, dateRented, durationOfRental, returnDate} = req.body;
    let queryString = `INSERT INTO borrowed(username, membershipnumber, bookid, daterented, durationofrental, returndate)
    VALUES($1, $2 ,$3, $4, $5, $6)`;
    db.client.query(queryString, 
        [userName, membershipNumber, bookID, dateRented, durationOfRental, returnDate], 
        (err, results) => {
            if (err) {
                res.send(err)
            } else {
                res.send(results);
                changeBookStatus(bookID, true);
            }
    });

})

app.put('/return', (req, res) => {
    let { membershipNumber, bookID } = req.body;
    console.log(membershipNumber, bookID);
    let queryString = 'DELETE FROM borrowed WHERE membershipnumber = $1 AND bookid = $2'
    db.client.query(queryString, [membershipNumber, bookID], (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            if (result.rowCount === 0) {
                res.send(false)
            } else {
                res.send(true);
            }
        }
    })
    changeBookStatus(bookID, false)
})

// ====================== HELPER FUNCTION =========================

let changeBookStatus = (bookID, status) => {
    let queryString = 'UPDATE books SET bookstatus = $1 WHERE bookid = $2'
    db.client.query(queryString, [status, bookID], (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.log(results);
        }
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))