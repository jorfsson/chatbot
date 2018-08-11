const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const request = require('request-promise')
const qs = require('query-string')
const natural = require('natural')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
    res.send([{
      title: "hello World!",
      description: "Hi there! how are you!?"
    }]
  )
})

app.post('/posts', (req, res) => {
  let query = {q: req.body.query.split(' ').join('+')}
  let options = {
    url: 'https://api.pushshift.io/reddit/comment/search',
    qs: query,
    method: 'GET'
  }
  request(options)
  .then((data)=>JSON.parse(data))
  .then((data)=>data.data
    .map((comment)=>comment.body)
    .filter((string)=>!string.includes('#') ? true : !string.includes('|') ? true : false)
    .map((string)=>string.replace(/^\w\s|'|,|.|!|/gi, '')
      .replace([/-|&gt;|&gt|\'/gi], '')
      .split('\n').join(' ')))
  .then((text) => {console.log(text)})
})

app.listen(process.env.PORT || 8081)
