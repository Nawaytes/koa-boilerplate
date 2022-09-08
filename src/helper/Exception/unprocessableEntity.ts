import { HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../error_handler'

export default class UnprocessableEntityException extends Error {
    public type: string
    public httpCode: number
    public detail: any
    public expected: boolean

    constructor(message: string, detail: any = {}) {
        super(message)
        this.name = 'UnprocessableEntityException'
        this.httpCode = HTTP_STATUS_UNPROCESSABLE_ENTITY
        this.detail = detail || {}
    }
}
