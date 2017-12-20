const bookshelf = require('../index.js').bookshelf;
const Account = require('./Accounts.models');

const User = bookshelf.Model.extend({
  tableName: 'users',
  byId(id) {
    return this.forge().query({ where: { id } }).fetch();
  },
  account() {
    return this.belongsTo('Account');
  },
});

module.exports = bookshelf.model('User', User);