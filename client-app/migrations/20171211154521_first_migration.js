
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('accounts', (table) =>{
    table.increments('id').primary();
    table.string('service_plan');
  }).createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.integer('account_id').references('accounts.id');
  })
]);

exports.down = (knex, Promise) => Promise.all([knex.schema.dropTable('restaurants')
  .dropTable('users')
  .dropTable('accounts'),
]);
