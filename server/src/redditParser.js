const Filter = require('bad-words')
const fs = require('fs')
const clean = new Filter();

fs.readFile('./src/data/RC_2005-12', (err, data) => {
  let dataDump = JSON.parse(data.toString()),
      comments = {}
      pairs = [];

  let cleanedData = dataDump.filter((comment)=>
    comment.body.includes('#') ? false :
    comment.body.includes('|') ? false :
    comment.body.includes('[') ? false :
    comment.body.includes('^') ? false :
    comment.body.includes('{') ? false :
    comment.body.includes('*') ? false :
    comment.body.includes('/') ? false :
    comment.body.includes('(') ? false :
    clean.isProfane(comment.body) ? false : true)

  cleanedData.forEach((comment)=>{
    comments[comment.id] = comment.body.replace(/[\s+]/gi, ' ').replace(/"/gi, "'")
  })

  cleanedData.forEach((comment)=>{
    if (comment.parent_id && comments[comment.parent_id.slice(3)]) {
      pairs.push({input: comments[comment.parent_id.slice(3)], output: comment.body.replace(/[\s+]/gi, ' ').replace(/"/gi, "'")})
    }
  })
  fs.writeFileSync('./src/data/reddit.txt', JSON.stringify(pairs))
})
