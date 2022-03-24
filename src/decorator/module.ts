import * as Router from 'koa-router';

export function module(route) {
    return (constructor) => {
        constructor.prototype.__routeName = route;
        constructor.prototype.__router = constructor.prototype.__router || new Router();
    };
}
