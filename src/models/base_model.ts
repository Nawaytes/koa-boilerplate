import * as Knex from 'knex';
import {DateTime} from 'luxon';
import {Model} from 'objection';
import * as uuid from 'uuid';
// import * as softDelete from '@knax/objection-soft-delete';

// let extendedModel = softDelete({
//     columnName: 'deleted_at',
//     deletedValue: () => DateTime.local().toISO(),
//     notDeletedValue: null
// })(Model);
//
// tslint:disable:no-var-requires
const knex = Knex(require('../../knexfile')[process.env.NODE_ENV || 'development']);
//
// extendedModel.knex(knex);
Model.knex(knex);

export default class BaseModel extends Model {
    public id: string;
    // tslint:disable:variable-name
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public $beforeInsert() {
        this.id = this.id || uuid.v4();
        this.created_at = DateTime.local().toISO();
    }

    public $beforeUpdate() {
        this.updated_at = DateTime.local().toISO();
    }
}
