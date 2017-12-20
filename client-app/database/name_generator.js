const first_name = require('../random_names/first_names.json');
const last_name = require('../random_names/last_names.json');
const emails = ['@gmail.com', '@yahoo.com', '@msn.com', '@aol.com', '@hotmail.com'];
const User = require('./models/Users.models');
const knex = require('/Users/luisalvarez/Desktop/Code/hrsf83-thesis/database/index.js').knex;
const Promise = require('bluebird');
var account_id = 1;
var globalCounter = 1;

async function nameGenerator () {
  var names = [];
  for (var i = 0; i < 1000; i++) {
    var firstName = first_name[Math.floor(Math.random() * first_name.length)];
    var lastName = last_name[Math.floor(Math.random() * last_name.length)];
    var email = (firstName + lastName + emails[Math.floor(Math.random() * emails.length)]).toLowerCase();
    names.push({first_name: firstName, last_name: lastName, email, account_id});
    globalCounter++;
    if(account_id === 2000000 && globalCounter < 8000000){
      account_id = 1;
    } else if(globalCounter === 8000000){
        account_id = 2000000
    }
    account_id++;
  }
  await knex.transaction(function(tr) {
    return knex.batchInsert('users', names, 500)
      .transacting(tr)
    })
    .then(result => result)
    .catch((error)=> console.log(error));
};

const generate = () => {
  let promises = []
  for(var i = 0; i < 2000; i++){
    promises.push(nameGenerator());
  }
  Promise.all(promises).then(() => {
    promises = [];
    for(var i = 0; i < 2000; i++){
      promises.push(nameGenerator());
    }
    Promise.all(promises).then(() => {
      promises = [];
      for(var i = 0; i < 2000; i++){
        promises.push(nameGenerator());
      }
      Promise.all(promises).then(() => {
        promises = [];
        for(var i = 0; i < 2000; i++){
          promises.push(nameGenerator());
        }
          Promise.all(promises).then(() => {
            promises = [];
            for(var i = 0; i < 2000; i++){
              promises.push(nameGenerator());
            }
          });
       });
    });
  });
}

