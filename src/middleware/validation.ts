// @ts-ignore
import * as Validator from 'fastest-validator';
import {appConfig} from '../../config/app';
import {ApplicationError} from '../helper/error_handler';

// @ts-ignore
const v = new Validator({
    messages: appConfig.validation_message
});

export const validator = {
    query: (schema) => {
        const compiledSchema = v.compile(schema);
        return async (ctx, next) => {
            const result = compiledSchema(ctx.query);

            if (Array.isArray(result)) {
                throw new ApplicationError({
                    message: 'Validation Error',
                    type: 'QueryValidationError',
                    detail: result
                });
            } else {
                await next();
            }
        };
    },
    body: (schema) => {
        const compiledSchema = v.compile(schema);
        return async (ctx, next) => {
            const result = compiledSchema(ctx.request.body);
            if (Array.isArray(result)) {
                throw new ApplicationError({
                    message: 'Validation Error',
                    type: 'BodyValidationError',
                    detail: result
                });
            } else {
                await next();
            }
        };
    },
    params: (schema) => {
        const compiledSchema = v.compile(schema);
        return async (ctx, next) => {
            const result = compiledSchema(ctx.params);
            if (Array.isArray(result)) {
                throw new ApplicationError({
                    message: 'Validation Error',
                    type: 'ParamsValidationError',
                    detail: result
                });
            } else {
                await next();
            }
        };
    },
};
