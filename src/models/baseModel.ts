import Knex from 'knex'
import { DateTime } from 'luxon'
import { Model } from 'objection'
import uuid from 'uuid'
import knexConfig from '../../knexfile'

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

Model.knex(knex)
export default class BaseModel extends Model {
    public id: string
    // tslint:disable:variable-name
    public created_at: string
    public updated_at: string
    public deleted_at: string

    public $beforeInsert() {
        this.id = this.id || uuid.v4()
        this.created_at = DateTime.local().toISO()
    }

    public $beforeUpdate() {
        this.updated_at = DateTime.local().toISO()
    }
}
