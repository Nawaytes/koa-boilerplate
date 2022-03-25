import {appConfig} from '../../config/app';
import {log} from './logger';

const errorTypeHttpCode = {
    QueryValidationError: 400,
    ParamsValidationError: 400,
    BodyValidationError: 400,
    InvalidRequest: 400,
    InvalidVerificationCode: 400,
    AuthenticationError: 401
};

export const ERROR_CODE  = {
    QueryValidationError: 'QueryValidationError',
    ParamsValidationError: 'ParamsValidationError',
    BodyValidationError: 'BodyValidationError',
    InvalidRequest: 'InvalidRequest',
    InvalidVerificationCode: 'InvalidVerificationCode',
    AuthenticationError: 'AuthenticationError',
};

export class ApplicationError extends Error {
    public type: string;
    public httpCode: number;
    public detail: any;
    public expected: boolean;

    constructor(obj) {
        super(obj.message);
        this.name = obj.type;
        this.httpCode = errorTypeHttpCode[obj.type] || 500;
        this.detail = obj.detail || {};
        this.expected = (typeof obj.expected === 'undefined') ? true : !!obj.expected;
    }
}

export function isExpectedError(err) {
    if (err instanceof ApplicationError) {
        return err.expected;
    } else {
        return false;
    }
}

export async function errorHandler(err) {
    if (isExpectedError(err)) {
        log.warn(err);
    } else {
        log.error(err);
    }
}
