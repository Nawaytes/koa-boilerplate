import Koa from 'koa'
import { module } from '../decorator/module'
import { get } from '../decorator/route'
import { constants } from '../../config/const'

@module('/')
export default class RootModule {
    @get('/', [])
    public async get(ctx: Koa.DefaultContext) {
        ctx.body = {
            message: 'API is running',
            version: constants.VERSION,
        }
    }
}
