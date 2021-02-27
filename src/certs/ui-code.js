var fs = require('fs')
var pg = require('pg')

// Connect to the bank database.
var config = {
  user: 'app_user',
  host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
  port: 26257,
  database: 'mild-pig-985.hackutdvii',
  password: fs.readFileSync('./app_user.pass').toString(),
  ssl: {
    rejectUnauthorized: false,
  },
}

// Create a pool.
const pool = new pg.Pool(config)

pool.query('SELECT * FROM lendings where item = \'item1\'', (err, res) => {
  if (err) {
    throw err
  }
  console.log('user:', res.rows)
  pool.end()
})

