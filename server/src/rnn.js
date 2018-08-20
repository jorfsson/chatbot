const brain = require('brain.js')
const fs = require('fs')
const data = fs.readFileSync('./src/data/reddit.txt')
const parsedData = JSON.parse(data)
const trainedJSON = fs.readFileSync('./src/data/brain.txt')
const trainedBrain = JSON.parse(trainedJSON)

const lstm = new brain.recurrent.LSTM();
lstm.fromJSON(trainedBrain)
const trainedRun = lstm.run('Hello friends, how are we doing today?');

console.log('Trained Run: ' + trainedRun);

lstm.train(parsedData, { iterations: 10000, log: true, learningRate: 0.5, callback: (data)=>{console.log('hey friend: ' + lstm.run('HEY FRIEND'))} })

const JSONbrain = JSON.stringify(lstm.toJSON())

fs.writeFileSync('./src/data/brain.txt', JSONbrain);

const run1 = lstm.run('Hello friends, how are we doing today?');
const run2 = lstm.run('Time to go, the protestors are here.');
const run3 = lstm.run('Where go here?');

console.log('run 1: ' + run1);
console.log('run 2: ' + run2);
console.log('run 3: ' + run3);
