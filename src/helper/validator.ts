// @ts-ignore
import * as Validator from 'fastest-validator';
import {ApplicationError} from './error_handler';

interface IValidatorConfig {
    schema: any;
    config?: any;
    optionals?: string[]|'*';
}

export const validate = (config: IValidatorConfig, body: any) => {

    let schema = config.schema;

    if (config.optionals) {
        schema = Object.keys(schema).reduce((all, k) => {

            const optional = config.optionals === '*' ? true : (config.optionals.indexOf(k) >= 0);

            return {
                ...all,
                [k]: {
                    ...schema[k],
                    optional
                }
            };
        }, {});
    }

    // @ts-ignore
    const v = new Validator(config.config);
    const result = v.compile(schema)(body);

    if (Array.isArray(result)) {
        throw new ApplicationError({
            message: 'Validation Error',
            type: 'QueryValidationError',
            detail: result
        });
    } else {
        return body;
    }
};
