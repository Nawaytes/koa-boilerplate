import {QueryBuilder} from 'objection';
import {Model} from "objection";

// TODO: temp solution for objection soft delete
declare module 'objection' {
    interface QueryBuilder {
        hardDelete():void;
    }
}

declare module '@knax/objection-soft-delete' {
    export default function softDelete():Model;
}
