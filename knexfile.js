let environment = 'production' || `${process.env.NODE_ENV}`;
module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://postgres:rebase@localhost:5432/catalog',
		migrations: {
			directory: __dirname + `/catalog/database/migrations`
		},
		seeds: {
			directory: __dirname + `/catalog/database/seeds`
		}
	},
	production: {
		client: 'pg',
		connection: process.DATABASE_URL,
		migrations: {
			directory: __dirname + `/catalog/database/migrations`
		},
		seeds: {
			directory: __dirname + `/catalog/database/seeds`
		}
	}
}