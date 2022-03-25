import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';
import {ApplicationError, errorHandler, isExpectedError} from './helper/error_handler';
import {attachLogger} from './helper/logger';
import initializeModules from './modules';
import initializeScheduler from "./scheduler";

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status === 401) {
            err = new ApplicationError({
                message: err.message,
                type: 'AuthenticationError',
                detail: {}
            });
        }
        ctx.app.emit('error', err, ctx);
        if (isExpectedError(err)) {
            ctx.status = err.httpCode;
            ctx.body = {
                message: err.message,
                type: err.name,
                detail: err.detail
            };
            return;
        } else {
            ctx.status = 500;

            let message = 'InternalServerError';

            if (err.stack) {
                message = err.stack.split('\n')[0];
            }

            ctx.body = {
                message,
                status: false
            };
            return;
            // throw err;
        }
    }
});

app.use(cors());
initializeModules(router);
initializeScheduler();
attachLogger(app);
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
    errorHandler(err);
});

export default app;
