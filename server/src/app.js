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
const { wordGen, sentenceGen, triGramGen, longestWord } = require('./generator')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/sentenceGen', (req, res) => {
    res.send([{sentence: sentenceGen(8)
    }])
})

app.get('/markov', (req, res) => {
  res.send(sentenceGen(10))
})

app.post('/posts', (req, res) => {
  let query = req.body.query.split(' ').join('+');
  responder(query)
  .then((text) => {
    res.send(text[Math.floor(Math.random() * text.length) + 1])
  })
})

app.listen(process.env.PORT || 8081, '0.0.0.0')
