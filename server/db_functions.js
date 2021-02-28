const pg = require('pg')

// Connect to the bank database.
const config = require('./app_user_config-secret').config

function getLendersWithItems(itemList, callback) {
  if (itemList.length === 0)
    return callback([])

  const pool = new pg.Pool(config)
  pool.query('SELECT * FROM lendings' + itemList.reduce(
    (acc, cur) => (acc.length === 0 ? ' where ' : acc + ' or ') + `item = '${cur}'`, ''),
    (err, res) => {
      if (err) {
        throw err
      }
      callback(res.rows)
      pool.end()
    })
}


function pushLendingItem(data) {
  const pool = new pg.Pool(config)
  pool.query(`INSERT INTO lendings VALUES ('${data.username}','${data.location}','${data.item}')`,
    (err, res) => {
      if (err) {
        throw err
      }
      pool.end()
    })
}


module.exports = {
  getLendersWithItems,
  pushLendingItem
}