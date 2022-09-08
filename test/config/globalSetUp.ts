const knex = require('../../src/models/baseModel').default
import dotenv from 'dotenv'

const setup = async () => {
    dotenv.config({ path: __dirname + '/../../.env.test' })
    await knex.knex().migrate.rollback()
    await knex.knex().migrate.latest()
    await knex.knex().seed.run()
}
export default setup
