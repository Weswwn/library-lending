const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    username: 'username',
    database: 'library'
});

client.connect();

client.query('SELECT $1::text as message', ['Connected'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message)
})

module.exports.client = client;