const knex = require('../../src/models/baseModel').default
const tearDown = async () => {
    await knex.knex().migrate.rollback()
}
export default tearDown
