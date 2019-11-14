const db = require('./connector.js');

let generateUsers = () => {
    let userObj = {
        '1': 'Wesley',
        '2': 'Jennie',
        '3': 'John'
    }
    for (let key in userObj) {
        let queryString = 'INSERT INTO users (username) VALUES ($1)';
        db.client.query(queryString, [userObj[key]], (error, results) => {
            if (error) console.log(error);
            // if (results) console.log(results);
        })
    }
}

generateUsers();

let generateBooks = () => {
    let bookObj = {
        '1': 'The Alchemist',
        '2': 'Gone With the Wind',
        '3': 'Divergent'
    }
    for (let key in bookObj) {
        let queryString = 'INSERT INTO books (booktitle, bookstatus) VALUES ($1, $2)'
        db.client.query(queryString, [bookObj[key], false], (error, results) => {
            if (error) console.log(error);
            // if (results) console.log(results);
        })
    }
}

// ALTER SEQUENCE users_id_seq RESTART WITH 1
generateBooks();