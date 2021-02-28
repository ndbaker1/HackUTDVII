const bodyParser = require('body-parser');
const { getLendersWithItems, pushLendingItem } = require('./db_functions')

const app = require('express')()
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
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
  console.log('SERVER LISTENING ON PORT ' + port)
})
