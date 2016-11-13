const MongoClient = require('mongodb').MongoClient;
const getChallenges = require('./seed/getChallenges');

let challengeData = getChallenges();

function getRandomDate() {
  let start = 1413262800000;
  let end = Date.parse(new Date());
  return Math.floor(Math.random() * (end - start) + start);
}

function updateDB(challengeProgress, challengeMapObj) {
  if (!process.argv[2]) {
    console.log(
      'Error: Please input user as argument' +
          '(ex. $ node make-test-user.js <usernameToUpdate>)' +
              '\nYou can find your username on the profile page in ' +
                  'the Settings area.'
    );
    return;
  }
  MongoClient.connect('mongodb://localhost:27017/freecodecamp',
  (err, db) => {
    if (!err) {
      console.log('User updated');
      db.collection('user')
        .update({username: process.argv[2]},
          {$set: {progressTimestamps: challengeProgress,
          challengeMap: challengeMapObj, isBackEndCert: true,
          isFrontEndCert: true, isFullStackCert: true,
          isDataVisCert: true, isHonest: true
          }}, false, true);
        }
        db.close();
    });
}

function seedTestUser() {
  let challengeProgress = [];
  let challengeMapObj = {};

  for (let i = 0; i < challengeData.length; i++) {
    for (let j = 0; j < challengeData[i].challenges.length; j++) {
      let timestamp = getRandomDate();
      let challengeId = challengeData[i].challenges[j].id;
      let progObj = {
          timestamp: timestamp,
          completedChallenge: challengeData[i].challenges[j].id
        };
          challengeMapObj[challengeId] = {
          id: challengeId,
          completedDate: timestamp
        };
          challengeProgress.push(progObj);
      }
    }

    return updateDB(challengeProgress, challengeMapObj);
  }

seedTestUser();
