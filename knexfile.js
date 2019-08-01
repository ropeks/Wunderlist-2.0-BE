module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://hjlrtmbsiderkl:97ffd98cfe9c8f87d610129a67d6e1f0f8028b4a5ccf473ffc94a103dc6a8e7c@ec2-54-217-219-235.eu-west-1.compute.amazonaws.com:5432/d4cpr3jk19aov5' + '?ssl=true',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/wundertest.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};