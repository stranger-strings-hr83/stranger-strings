const config = require ('../.././config/development.json');
const knex = require('knex')({
  client: 'postgres',
  connection: "postgres://luisalvarez:scooby225@localhost:5432/netflix",
  pool: {
    max: 200,
    min: 1
  }
});
  
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
  
module.exports = {
  bookshelf,
  knex,
};