import { HTTP_STATUS_BAD_REQUEST } from '../error_handler'

export default class BadRequestException extends Error {
    public type: string
    public httpCode: number
    public detail: any
    public expected: boolean

    constructor(message: string, detail: any = {}) {
        super(message)
        this.name = 'BadRequestException'
        this.httpCode = HTTP_STATUS_BAD_REQUEST
        this.detail = detail || {}
    }
}
