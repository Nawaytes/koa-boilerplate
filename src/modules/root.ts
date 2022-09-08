import { module } from '../decorator/module'
import { del, get, post, put } from '../decorator/route'
import { createModuleLogger } from '../helper/logger'
import { validator } from '../middleware/validation'
import Koa from 'koa'
const packageJson = require('../../package.json')

@module('/')
export default class RootModule {
    @get('/', [])
    public async get(ctx: Koa.DefaultContext) {
        ctx.body = {
            message: 'API is running',
            version: packageJson.version,
        }
    }
}
