import {module} from '../decorator/module';
import {del, get, post, put} from '../decorator/route';
import {createModuleLogger} from '../helper/logger';
import {checkToken} from '../middleware/jwt';
import {validator} from '../middleware/validation';

const packageJson = require('../../package.json');

const log = createModuleLogger('root');

@module('/')
export default class RootModule {
    @get('/', [])
    public async get(ctx) {
        ctx.body = {
            message: 'API is running',
            version: packageJson.version
        };
    }
}
