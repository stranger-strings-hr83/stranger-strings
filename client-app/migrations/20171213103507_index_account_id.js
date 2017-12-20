
exports.up = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.index(['account_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) =>{
    table.dropIndex(['account_id']);
  });
};
