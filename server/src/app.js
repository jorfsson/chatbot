const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const request = require('request-promise')
const qs = require('query-string')
const mc = require('markovchain')
const une = require('unescape-js')
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
    .filter((string)=>!string.includes('#'))
    .filter((string)=>!string.includes('|'))
    // .map((string)=>une(string))
    .map((string)=>string.replace([/^\w\s|'|,|.|!|/gi], ''))
    .map((string)=>string.replace([/-|\\|\[|\]|\{|\}/gi], ''))
    .map((string)=>string.replace([/&gt;|&gt|\n/gi], ''))
    .map((string)=>string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''))
    .map((string)=>string.split('\n').join(' '))
    .map((string)=>string.split('  ').join(' '))
    .map((string)=>string.split('  ').join(' '))
    .map((string)=>string.split('&gt;').join(' '))
    .map((string)=>string.split('\'').join('')))
  .then((text) => {console.log(text)})
  res.send('hello')
})

app.listen(process.env.PORT || 8081)
