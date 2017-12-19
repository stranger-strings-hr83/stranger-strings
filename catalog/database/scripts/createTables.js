exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('genre', function(table) {
  		table.increments('id').primary();
  		table.string('name');
  	}),
  	knex.schema.createTable('content', function(table) {
  		table.increments('id').primary();
  		table.string('name');
  		table.integer('year');
  		// table.integer('run_time');
  		table.integer('genre_id').references('id').inTable('genre').notNullable();
  	}),
  	knex.schema.createTable('movies', function(table) {
  		table.increments('id').primary();
  		table.string('name');
  		table.boolean('is_original');
  		table.integer('run_time');
  		table.integer('total_bytes');
  		table.integer('total_views');
  		table.string('box_shot');
  		table.integer('content_id').references('id').inTable('content').notNullable();
  	}),
  	knex.schema.createTable('seasons', function(table) {
  		table.increments('id').primary();
  		table.integer('season_number');
  		table.boolean('is_original');
  		table.integer('run_time');
  		table.integer('total_bytes');
  		table.integer('total_views');
  		table.string('box_shot');
  		table.integer('content_id').references('id').inTable('content').notNullable();
  	}),
  	knex.schema.createTable('shows', function(table) {
  		table.increments('id').primary();
  		table.string('name');
  		table.integer('run_time');
  		table.integer('seasons_id').references('id').inTable('seasons').notNullable();
  	})
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('genre')
    .dropTable('content')
    .dropTable('movies')
    .dropTable('seasons')
    .dropTable('shows')

};
