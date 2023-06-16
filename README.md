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

- **Node.js v16** - Official website: [https://nodejs.org](https://nodejs.org)
- **Koa.js** - Official website: [https://koajs.com/](https://koajs.com/)
- **Koa.js Documentation**: [https://devdocs.io/koa/](https://devdocs.io/koa/)
- **ORM: Knex.js** - Official website: [https://knexjs.org/](https://knexjs.org/)
- **ORM: Objection.js** - Official website: [https://vincit.github.io/objection.js/](https://vincit.github.io/objection.js/)
- **Express**
- **Validation: Fastest Validator** - [https://www.npmjs.com/package/fastest-validator](https://www.npmjs.com/package/fastest-validator)

## Build
Run the following command to build the project:

| height=100```shell
npm run build
| height=100```

## Start the Server
To start the server, run the following command:

| height=100```shell
npm run start
| height=100```

## Start the Server for Development
To start the server in development mode, run the following command:

| height=100```shell
npm run start:dev
| height=100```

## Start the Server for Production
To start the server in production mode, follow these steps:

Run the following command:
| height=100```shell
npm ci
| height=100```

Start the server by running:
| height=100```shell
npm run start:prod
| height=100```

## Running Test Cases
To run the test cases, use the following command:

| height=100```shell
npm run test
| height=100```

## Migration
### Create a Migration File in TypeScript
To create a migration file, run the following command:

| height=100```shell
npx knex migrate:make migration_name
| height=100```

### Run Migrations
Once you have finished writing the migrations, you can update the database matching your `NODE_ENV` by running:

| height=100```shell
npx knex migrate:latest
| height=100```

You can also pass the `--env` flag or set `NODE_ENV` to select an alternative environment:

| height=100```shell
npx knex migrate:latest --env production