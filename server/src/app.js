const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const request = require('request-promise')
const qs = require('query-string')
const mc = require('markovchain')
const une = require('unescape-js')
const Filter = require('bad-words')
const { responder } = require('./helpers')
const { pride, wordGen, sentenceGen, triGramGen } = require('./generator')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
    res.send([{
      title: "hello World!",
      description: "Hi there! how are you!?"
    }])
})

app.post('/posts', (req, res) => {
  let query = req.body.query.split(' ').join('+');
  responder(query)
  .then((text) => {
    res.send(text[Math.floor(Math.random() * text.length) + 1])
  })
})

app.listen(process.env.PORT || 8081)
