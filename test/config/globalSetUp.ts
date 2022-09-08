import dotenv from 'dotenv'
import BaseModel from '../../src/models/baseModel'

const setup = async () => {
    dotenv.config({ path: __dirname + '/../../.env.test' })
    await BaseModel.knex().migrate.rollback()
    await BaseModel.knex().migrate.latest()
    await BaseModel.knex().seed.run()
}
export default setup
