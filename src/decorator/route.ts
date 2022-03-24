import * as Router from 'koa-router';
import { appConfig } from '../../config/app';

// tslint:disable:no-var-requires
const koaBody = require('koa-body')({
    multipart: true,
    formidable: {
        uploadDir: appConfig.upload_dir,
        keepExtensions: true
    }
});

export function get(route, middleware = []) {
    return (target, propertyKey) => {
        target.__router = target.__router || new Router();
        target.__router.get(route, ...middleware, target[propertyKey].bind(target));
    };
}
export function put(route, middleware = []) {
    return (target, propertyKey) => {
        target.__router = target.__router || new Router();
        target.__router.put(route, koaBody, ...middleware, target[propertyKey].bind(target));
    };
}
export function post(route, middleware = []) {
    return (target, propertyKey) => {
        target.__router = target.__router || new Router();
        target.__router.post(route, koaBody, ...middleware, target[propertyKey].bind(target));
    };
}
export function del(route, middleware = []) {
    return (target, propertyKey) => {
        target.__router = target.__router || new Router();
        target.__router.del(route, ...middleware, target[propertyKey].bind(target));
    };
}
