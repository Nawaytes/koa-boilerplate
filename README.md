# backend-node

## pre requisite
- install [Node.JS](https://nodejs.org/en/download/)
- install nvm
- install npm
- run `npm install`

## build
`npm run build`

## start the server
`npm run start`

## start the server (automatic restart)
`npm run dev:watch` 

## run test case
`npm run test`

## migration
### Create a migration file in ts
`npx knex migrate:make migration_name -x ts`
### run migration

Once you have finished writing the migrations, you can update the database matching your NODE_ENV by running:

`npx knex migrate:latest`

You can also pass the --env flag or set NODE_ENV to select an alternative environment:

`npx knex migrate:latest --env production`

`npx NODE_ENV=production knex migrate:latest`

To rollback the last batch of migrations:

`npx knex migrate:rollback`

To rollback all the completed migrations:

`npx knex migrate:rollback --all`

To run the next migration that has not yet been run

`npx knex migrate:up`

To run the specified migration that has not yet been run

`npx knex migrate:up 001_migration_name.js`

To undo the last migration that was run

`npx knex migrate:down`

To undo the specified migration that was run

`npx knex migrate:down 001_migration_name.js`

To list both completed and pending migrations:

`npx knex migrate:list`

## Seed files
Seed files allow you to populate your database with test or seed data independent of your migration files.

### Seed CLI
To create a seed file, run:

`npx knex seed:make seed_name`

### To run seed files, execute:

`npx knex seed:run`

Seed files are executed in alphabetical order. Unlike migrations, every seed file will be executed when you run the command. You should design your seed files to reset tables as needed before inserting data.

To run specific seed files, execute:

`npx knex seed:run --specific=seed-filename.js --specific=another-seed-filename.js`

## run on production
- `npm ci`
- `npm run start:prod`
