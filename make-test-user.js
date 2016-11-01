
var fs = require('fs');
var getChallenges = require('./seed/getChallenges');
var challengeSpecs = getChallenges();
fs.writeFileSync('seed/challenge-bundle.json', JSON.stringify(challengeSpecs));

function getRandomDate() {
  var start = 1413262800000;
  var end = Date.parse(new Date());

  return (Math.floor(Math.random() * (end - start) + start)).toString();
}

function seedTestUser() {
let challengeCollection = []



for (let i = 0; i<challengeSpecs.length; i++) {
  for (let j = 0; j<challengeSpecs[i].challenges.length; j++) {
    let obj = {
      "progressTimestamps": [{
        "timestamp": "",
        "completedChallenge": ""
      }],
      "challengeMap": {}
    }
    obj.progressTimestamps[j].timestamp = getRandomDate();
    challengeCollection.push(obj)

  }

}
console.log(challengeCollection)


}

seedTestUser()
