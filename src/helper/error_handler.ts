import { appConfig } from '../../config/app'
import { log } from './logger'

const errorTypeHttpCode = {
    QueryValidationError: 400,
    ParamsValidationError: 400,
    BodyValidationError: 400,
    InvalidRequest: 400,
    InvalidVerificationCode: 400,
    AuthenticationError: 401,
}

export const ERROR_CODE = {
    QueryValidationError: 'QueryValidationError',
    ParamsValidationError: 'ParamsValidationError',
    BodyValidationError: 'BodyValidationError',
    InvalidRequest: 'InvalidRequest',
    InvalidVerificationCode: 'InvalidVerificationCode',
    AuthenticationError: 'AuthenticationError',
}

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_CREATED = 201
export const HTTP_STATUS_ACCEPTED = 202
export const HTTP_STATUS_NON_AUTHORITATIVE_INFORMATION = 203
export const HTTP_STATUS_NO_CONTENT = 204
export const HTTP_STATUS_RESET_CONTENT = 205
export const HTTP_STATUS_PARTIAL_CONTENT = 206
export const HTTP_STATUS_MULTI_STATUS = 207
export const HTTP_STATUS_ALREADY_REPORTED = 208

export const HTTP_STATUS_MULTIPLE_CHOICES = 300
export const HTTP_STATUS_MOVED_PERMANENTLY = 301
export const HTTP_STATUS_FOUND = 302
export const HTTP_STATUS_SEE_OTHER = 303
export const HTTP_STATUS_NOT_MODIFIED = 304
export const HTTP_STATUS_USE_PROXY = 305
export const HTTP_STATUS_TEMPORARY_REDIRECT = 307
export const HTTP_STATUS_PERMANENT_REDIRECT = 308

export const HTTP_STATUS_BAD_REQUEST = 400
export const HTTP_STATUS_UNAUTHORIZED = 401
export const HTTP_STATUS_PAYMENT_REQUIRED = 402
export const HTTP_STATUS_FORBIDDEN = 403
export const HTTP_STATUS_NOT_FOUND = 404
export const HTTP_STATUS_METHOD_NOT_ALLOWED = 405
export const HTTP_STATUS_NOT_ACCEPTABLE = 406
export const HTTP_STATUS_PROXY_AUTHENTICATION_REQUIRED = 407
export const HTTP_STATUS_REQUEST_TIMEOUT = 408
export const HTTP_STATUS_CONFLICT = 409
export const HTTP_STATUS_GONE = 410
export const HTTP_STATUS_LENGTH_REQUIRED = 411
export const HTTP_STATUS_PRECONDITION_FAILED = 412
export const HTTP_STATUS_PAYLOAD_TOO_LARGE = 413
export const HTTP_STATUS_REQUEST_URI_TOO_LONG = 414
export const HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE = 415
export const HTTP_STATUS_REQUESTED_RANGE_NOT_SATISFIABLE = 416
export const HTTP_STATUS_EXPECTATION_FAILED = 417
export const HTTP_STATUS_IM_A_TEAPOT = 418
export const HTTP_STATUS_MISDIRECTED_REQUEST = 421
export const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422
export const HTTP_STATUS_LOCKED = 423
export const HTTP_STATUS_FAILED_DEPENDENCY = 424
export const HTTP_STATUS_UPGRADE_REQUIRED = 426
export const HTTP_STATUS_PRECONDITION_REQUIRED = 428
export const HTTP_STATUS_TOO_MANY_REQUESTS = 429
export const HTTP_STATUS_REQUEST_HEADER_FIELDS_TOO_LARGE = 431
export const HTTP_STATUS_CONNECTION_CLOSED_WITHOUT_RESPONSE = 444
export const HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS = 451
export const HTTP_STATUS_CLIENT_CLOSED_REQUEST = 499

export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
export const HTTP_STATUS_NOT_IMPLEMENTED = 501
export const HTTP_STATUS_BAD_GATEWAY = 502
export const HTTP_STATUS_SERVICE_UNAVAILABLE = 503
export const HTTP_STATUS_GATEWAY_TIMEOUT = 504
export const HTTP_STATUS_HTTP_VERSION_NOT_SUPPORTED = 505
export const HTTP_STATUS_VARIANT_ALSO_NEGOTIATES = 506
export const HTTP_STATUS_INSUFFICIENT_STORAGE = 507
export const HTTP_STATUS_LOOP_DETECTED = 508
export const HTTP_STATUS_NOT_EXTENDED = 510
export const HTTP_STATUS_NETWORK_AUTHENTICATION_REQUIRED = 511
export const HTTP_STATUS_NETWORK_CONNECT_TIMEOUT_ERROR = 599

export class ApplicationError extends Error {
    public type: string
    public httpCode: number
    public detail: any
    public expected: boolean

    constructor(obj) {
        super(obj.message)
        this.name = obj.type
        this.httpCode = obj.httpCode || 500
        this.detail = obj.detail || {}
        this.expected =
            typeof obj.expected === 'undefined' ? true : !!obj.expected
    }
}

export function isExpectedError(err) {
    if (err instanceof ApplicationError) {
        return err.expected
    } else {
        return false
    }
}

export async function errorHandler(err) {
    if (process.env.NODE_ENV !== 'test') {
        if (isExpectedError(err)) {
            log.warn(err)
        } else {
            log.error(err)
        }
    }
}
