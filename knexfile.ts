import type { Knex } from 'knex'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: 'file:memDb1?mode=memory&cache=shared',
            flags: ['OPEN_URI', 'OPEN_SHAREDCACHE'],
        },
        // connection: { filename: './tmp/test.sqlite3' },
        migrations: {
            tableName: 'knex_migrations',
        },
        pool: {
            min: 2,
            max: 10,
        },
        useNullAsDefault: true,
        // recursiveStringcase: () => true
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
}

module.exports = config
