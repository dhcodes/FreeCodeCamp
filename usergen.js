import createNameIdMap from '../../common/utils/create-name-id-map';
var getChallenges = require('./seed/getChallenges');
var challengeSpecs = getChallenges();
//var fs = require('fs');
//fs.writeFileSync('seed/challenge-bundle.json', JSON.stringify(challengeSpecs));
import {
  modernChallengeCompleted,
  completedChallenge,
  projectCompleted,
  buildUserUpdate
} from './server/boot/challenge.js'
import {
  checkMapData,
  getFirstChallenge
} from './common/utils/get-first-challenge';

function getRandomDate() {
  var start = 1413262800000;
  var end = Date.parse(new Date());

  return (Math.floor(Math.random() * (end - start) + start)).toString();
}

function seedTestUser() {

  for (let i = 0; i<challengeSpecs.length; i++) {


  }

buildUserUpdate(
  process.argv[2],
  challengeId,
  completedChallenge,
  timezone
)
