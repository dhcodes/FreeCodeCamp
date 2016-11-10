
var Mongo = require('mongodb')
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
let challengeProgress = []
let challengeMapObj = {

}


for (let i = 0; i<challengeSpecs.length; i++) {
  for (let j = 0; j<challengeSpecs[i].challenges.length; j++) {
    let timestamp = getRandomDate()
    let challengeId = challengeSpecs[i].challenges[j].id
    let progObj = {
        "timestamp": timestamp,
        "completedChallenge": challengeSpecs[i].challenges[j].id
      }

    challengeMapObj[challengeId] = {
        id: challengeId,
        completedDate: timestamp
    }
    challengeProgress.push(progObj)
      }


    }

  return challengeProgress, challengeMapObj
  console.log(process.argv[2])
}

seedTestUser()
new Mongo()
let db = Mongo.connect("localhost:27020/freecodecamp")
db.user.update({username:process.argv[2]},{$set:{"progressTimestamps":challengeProgress,"challengeMap":challengeMapObj}},false,true)
