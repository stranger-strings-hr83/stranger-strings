var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = "postgres://luisalvarez:scooby225@localhost:5432/netflix";
var db = pgp(connectionString);

const grabUserByEmail = (email) => db.any('SELECT * FROM users WHERE email = $1', email);


module.exports = {
  grabUserByEmail
};