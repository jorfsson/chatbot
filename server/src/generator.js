const natural = require('natural')
const fs = require('fs')
const Analyzer = natural.SentimentAnalyzer
const stemmer = natural.PorterStemmer
const analyzer = new Analyzer('English', stemmer, 'afinn')
const Pride = fs.readFileSync('./src/data/pride.txt', 'utf8')
const NGrams = natural.NGrams
const tri = NGrams.trigrams(Pride)
const bi = NGrams.bigrams(Pride)
const tokenizer = new natural.WordPunctTokenizer()

const pride = Pride.replace(/[^\u0000-\u007F]+/gi, '');

const tokens = tokenizer.tokenize(pride)

const wordGen = () =>
  tokens[Math.floor(Math.random() * (tokens.length - 1)) + 1]

const frequencyTable = (nGrams) =>
  nGrams.reduce((acc, nGram)=>{
    if (acc[nGram[0]]) {
      acc[nGram[0]].push(nGram)
    } else {
      acc[nGram[0]] = [nGram]
    }
    return acc
  }, {})

const triFreq = frequencyTable(tri)
const biFreq = frequencyTable(bi)

const arrayEquals = (x, y) => {
  if (x === y) return true;
  if (x == null || y == null) return false;
  if (x.length != y.length) return false;

  for (var i = 0; i < x.length; ++i) {
    if (x[i] !== y[i]) return false;
  }
  return true;
}

const sentenceGen = (length) => {
  let result = [],
      findStarter = () => {
        let temp = wordGen();
        console.log(biFreq[temp])
        return biFreq[temp] ? (biFreq[temp].length > 0 ? temp : findStarter()) : findStarter()
      }
      starter = findStarter();

  result.push(starter)
  while (length > 0) {
    let wordPairs = biFreq[starter],
        pickedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)],
        probability = function(array, pair) {
          if (!array) {
            return 0
          }
          return array.reduce((x, y) => {
             return arrayEquals(y, pair) ? x + 1 : x}, 0) / wordPairs.length
          }(wordPairs, pickedPair);

    if (Math.random() < probability) {
      starter = pickedPair[1];
      result.push(starter)
      length--
    }
  }
  return result.join(' ')
}

const triGramGen = (length) => {
  let result = [],
      findStarter = () => {
        let temp = wordGen();
        return triFreq[temp] ? temp : findStarter()
      },
      starter = findStarter(),
      counter = 0;
  result.push(starter)
  while (length > 0) {
    counter += 1
    let wordTriplet = triFreq[starter],
        pickedTriplet = wordTriplet[Math.floor(Math.random() * wordTriplet.length)];
        probability = function(array, triplet) {
          let totalTriplets = array.length || 0
          return array.reduce((x, y) =>
             arrayEquals(y, triplet) ? x + 1 : x, 0) / totalTriplets
          }(wordTriplet, pickedTriplet);
    if (Math.random() < probability) {
      starter = pickedTriplet[2];
      result.push(pickedTriplet[1], pickedTriplet[2])
      length--
    }
  }
  for (var i = 0; i < result.length; i++) {
    if (result[i] === 't' || result[i] === 's' || result[i] === 'll') {
      result[i - 1] = result[i - 1] + "'" + result[i];
      result.splice(i)
    }
  }
  return result.join(' ')
}

const findLongestWord = (tokens) => {
  tokens.sort((a, b)=> b.length - a.length)
  return [tokens[0], tokens[0].length]
}

const longestWord = findLongestWord(tokens)



module.exports.wordGen = wordGen
module.exports.sentenceGen = sentenceGen
module.exports.triGramGen = triGramGen
module.exports.longestWord = longestWord
module.exports.triFreq = triFreq
