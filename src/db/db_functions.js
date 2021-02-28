const pg = require('pg')

// Connect to the bank database.
const config = require('./app_user_config').config

// Create a pool.
function getLendersWithItems(itemList) {
  const pool = new pg.Pool(config)
  pool.query('SELECT * FROM lendings' + itemList.reduce(
    (acc, cur) => (acc.length === 0 ? ' where ' : acc + ' or ') + `item = '${cur}'`, ''),
    (err, res) => {
      if (err) {
        throw err
      }
      console.log('user:', res.rows)
      pool.end()
    })
}

module.exports = {
  getLendersWithItems
}