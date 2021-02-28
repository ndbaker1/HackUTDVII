const bodyParser = require('body-parser');
const {
  getLendersWithItems,
  pushLendingItem,
  createNewTable
} = require('./db_functions')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../build'))

const port = process.env.port || 8000

app.post('/findLenders', (req, res) => {
  getLendersWithItems(req.body, (respones) => {
    res.send(respones)
  })
})

app.post('/pushLending', (req, res) => {
  pushLendingItem(req.body)
  res.send()
})

app.listen(port, () => {
  createNewTable()
  console.log('SERVER LISTENING ON PORT ' + port)
})
