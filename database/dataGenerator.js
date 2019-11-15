const db = require('./connector.js');

let generateUsers = () => {
  let userObj = {
    '1': 'Wesley',
    '2': 'Jennie',
    '3': 'John'
  }
  for (let key in userObj) {
    let queryString = 'INSERT INTO users (username) VALUES ($1)';
    db.client.query(queryString, [userObj[key]])
      .then((response) => {})
      .catch((error) => {
        console.log(error);
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
    db.client.query(queryString, [bookObj[key], false])
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
  }
}
generateBooks();