const bookshelf = require('../index.js').bookshelf;
const User = require('./Users.models');

const Account = bookshelf.Model.extend({
  tableName: 'accounts',
  byId(id) {
    return this.forge().query({ where: { id } }).fetch();
  },
  account() {
    return this.hasMany('User', 'account_id' );
  },
});

module.exports = bookshelf.model('Account', Account);