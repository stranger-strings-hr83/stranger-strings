
exports.up = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.index(['email']);
  });
};
  
exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) =>{
    table.dropIndex(['email']);
  });
};
