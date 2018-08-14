const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const request = require('request-promise')
const qs = require('query-string')
const mc = require('markovchain')
const une = require('unescape-js')
const Filter = require('bad-words')
const { pride, wordGen, sentenceGen, triGramGen } = require('./generator')

const clean = new Filter();
const app = express()

clean.addWords('rape', 'islam', 'white', 'nationalist', 'gay', 'Rape', 'Gay')

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
  sentenceGen(8)
  request.get(`https://api.pushshift.io/reddit/comment/search/?q=${query}&html_decode`)
  .then((data)=>JSON.parse(data))
  .then((data)=>data.data
    .map((comment)=>comment.body.split('. '))
    .reduce((x, y)=>x.concat(y))
    .filter((string)=> string.includes('#') ? false : true)
    .filter((string)=> string.includes('|') ? false : true)
    .filter((string)=> string.includes('[') ? false : true)
    .filter((string)=> string.includes('^') ? false : true)
    .filter((string)=> string.includes('{') ? false : true)
    .filter((string)=> string.includes('/') ? false : true)
    .filter((string)=> string.includes('*') ? false : true)
    .filter((string)=> clean.isProfaneLike(string) ? false : true)
    .map((string)=> string.trim())
    .map((string)=>string.replace(/^\w\s!'",.?/gi, '')
    // .map((string)=>string.replace(/[&lt;&gt;&quot;&amp;&copy;&reg;]/gi, '')
      .replace([/-|\\|\[|\]|\{|\}|\\\\/gi], '')
      .replace([/&gt;|&gt|\n/gi], '')
      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''))
    .map((string)=>string.split('\n').join(' ')
      .split('  ').join(' ')
      .split('  ').join(' ')
      .split('&gt;').join(' ')
      .split('\'').join('')))
  // .then((text) => text.filter((string)=> analyzer.getSentiment(string.split(' ')) >= 0.1 ? true : false))
  .then((text) => {res.send(text[Math.floor(Math.random() * text.length) + 1])})
})

app.listen(process.env.PORT || 8081)
