const Account = require('./models/Accounts.models');
const knex = require('/Users/luisalvarez/Desktop/Code/hrsf83-thesis/database/index.js').knex;

const addAccountToDataBase = (service_plan) => {
  const data = {
    service_plan
  };
  return Account.forge(data).save().then(account => account);
};

const accountGenerators = () => {
  var premium = [];
  for (let i = 0; i < 100; i++) {
    premium.push({service_plan: 'premium'});
  }
  for (let i = 0; i < 20000; i++) {
    knex.batchInsert('accounts', premium, 100); 
  }
  var standard = [];
  for (let j = 0; j < 150; j++) {
    standard.push({service_plan: 'standard'});
  }
  for (let j = 0; j < 4625; j++) {
    knex.batchInsert('accounts', standard, 150); 
  }
  var basic = [];
  for (let k = 0; k < 100; k++) {
    basic.push({service_plan: 'basic'});
  }
  for (let k = 0; k < 13875; k++) {
    knex.batchInsert('accounts', basic, 100); 
  }
};

