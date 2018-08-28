const { triFreq } = require('./generator')

function dataFormatter(data) {
  let result = []
  for (var i in data) {
    data[i].forEach((x)=>{
      result.push({input: x[0] + " " + x[1], output: x[2]})
    })
  }
  return result
}


exports.default = dataFormatter(triFreq)
