import * as onFinished from 'on-finished';
import * as pino from 'pino';
import * as util from 'util';
import {appConfig} from '../../config/app';

export const log = pino();

export function createLogger(type, name, config?) {
    return log.child({
        type,
        [type]: name,
        ...config
    });
}

export function createModuleLogger(name) {
    return log.child({
        type: 'module',
        module: name
    });
}

export function createServiceLogger(name) {
    return log.child({
        type: 'service',
        service: name
    });
}

const formatRequestMessage = function() {
    // return "";
    return util.format('  <-- %s %s',
        this.request.method, this.request.originalUrl);
};

const formatResponseMessage = function(data) {
    return util.format('  --> %s %s %d %sms',
        this.request.method, this.request.originalUrl,
        this.status, data.duration);
};

const levelFn = (status) => {
    if (status >= 500) {
        return 'error';

    } else if (status >= 400) {

        return 'warn';
    }
    return 'info';

};

const httpLog = log.child({
    type: 'http'
});

export function attachLogger(app) {
    app.use((ctx, next) => {
        const startTime = new Date().getTime();
        let err = null;

        const onResponseFinished = () => {
            const responseData: any = {
                req: ctx.req,
                res: ctx.res
            };

            if (err) {
                responseData.err = err;
            }

            responseData.duration = Date.now() - startTime;

            const level = levelFn.call(ctx, ctx.status, err);

            httpLog[level]({
                method: ctx.request.method,
                path: ctx.path,
                status: ctx.status,
                duration: responseData.duration
            }, formatResponseMessage.call(ctx, responseData));

            ctx.log = null;
        };

        return next().catch((e) => {
            err = e;
        }).then(() => {
            onFinished(ctx.response.res, onResponseFinished.bind(ctx));

            if (err) {
                throw err; // rethrow
            }
        });
    });
}
