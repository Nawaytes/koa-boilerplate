![Header Image](https://miro.medium.com/v2/resize:fit:1140/1*_SEhpSaIh7-l1jV-yFgeDQ.jpeg)
<p align="center">
  <img src="https://google.github.io/sqlcommenter/images/knex-logo.png" height="50px">
  <img src="https://raw.githubusercontent.com/kelektiv/node-cron/HEAD/logo.svg" height="50px">
  <img src="https://unicframework.github.io/validator/logo.jpg" height="50px">
  <img src="https://img.stackshare.io/service/6191/oDM0j5q0_400x400.png" height="50px">
  <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.png" height="50px">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" height="50px">
</p>

# Backend Node

## Introduction
Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. By leveraging async functions, Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within its core, and it provides an elegant suite of methods that make writing servers fast and enjoyable.


This repository contains the backend code for a Node.js project.

## Prerequisites
- Install [Node.js](https://nodejs.org/en/download/)
- Install `nvm`
- Install `npm`
- Run `npm install`

## Technologies Used
- Node.js v16 - Official website: [https://nodejs.org](https://nodejs.org)
- Koa.js - Official website: [https://koajs.com/](https://koajs.com/)
- Koa.js Documentation: [https://devdocs.io/koa/](https://devdocs.io/koa/)
- ORM: Knex.js - Official website: [https://knexjs.org/](https://knexjs.org/)
- ORM: Objection.js - Official website: [https://vincit.github.io/objection.js/](https://vincit.github.io/objection.js/)
- Express
- Validation: Fastest Validator - [https://www.npmjs.com/package/fastest-validator](https://www.npmjs.com/package/fastest-validator)

## Build
Run the following command to build the project:

```shell
npm run build
```

## Start the Server
To start the server, run the following command:

```shell
npm run start
```

## Start the Server for Development
To start the server in development mode, run the following command:

```shell
npm run start:dev
```

## Start the Server for Production
To start the server in production mode, follow these steps:

Run the following command:
```shell
npm ci
```

Start the server by running:
```shell
npm run start:prod
```

## Running Test Cases
To run the test cases, use the following command:

```shell
npm run test
```

## Migration
### Create a Migration File in TypeScript
To create a migration file, run the following command:

```shell
npx knex migrate:make migration_name
```

### Run Migrations
Once you have finished writing the migrations, you can update the database matching your `NODE_ENV` by running:

```shell
npx knex migrate:latest
```

You can also pass the `--env` flag or set `NODE_ENV` to select an alternative environment:

```shell
npx knex migrate:latest --env production
npx NODE_ENV=production knex migrate:latest
```

To rollback the last batch of migrations, use the following command:

```shell
npx knex migrate:rollback
```

To rollback all completed migrations, run the following command:

```shell
npx knex migrate:rollback --all
```

To run the next migration that has not yet been run, use the following command:

```shell
npx knex migrate:up
```

To run a specific migration that has not yet been run, run the following command:

```shell
npx knex migrate:up 001_migration_name.js
```

To undo the last migration that was run, use the following command:

```shell
npx knex migrate:down
```

To undo a specific migration that was run, run the following command:

```shell
npx knex migrate:down 001_migration_name.js
```

To list both completed and pending migrations, use the following command:

```shell
npx knex migrate:list
```

## Seed Files
Seed files allow you to populate your database with test or seed data independently of your migration files.

### Seed CLI
To create a seed file, run the following command:

```shell
npx knex seed:make seed_name
```

### Run Seed Files
To run the seed files, execute the following command:

```shell
npx knex seed:run
```

Seed files are executed in alphabetical order. Unlike migrations, every seed file will be executed when you run the command. You should design your seed files to reset tables as needed before inserting data.

To run specific seed files, execute the following command:

```shell
npx knex seed:run --specific=seed-filename.js --specific=another-seed-filename.js
```

Feel free to customize and modify this `README.md` file further as per your requirements.
