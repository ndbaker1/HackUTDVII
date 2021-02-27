var fs = require('fs')
var pg = require('pg')

// Connect to the bank database.
var config = {
  user: 'app_user',
  host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
  port: 26257,
  database: 'mild-pig-985.hackutdvii',
  ssl: {
    ca: fs.readFileSync('./ca.crt')
      .toString(),
    key: fs.readFileSync('./client.app_user.key')
      .toString(),
    cert: fs.readFileSync('./client.app_user.crt')
      .toString()
  },


}

// Create a pool.
const pool = new pg.Pool(config)

pool.query('SELECT * FROM hackutdvii WHERE item = \'shovel\'', [1], (err, res) => {
  if (err) {
    throw err
  }
  console.log('user:', res.rows[0])
})

