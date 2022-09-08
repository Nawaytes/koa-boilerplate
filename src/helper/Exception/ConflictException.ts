import { HTTP_STATUS_CONFLICT } from '../error_handler'

export default class ConflictException extends Error {
    public type: string
    public httpCode: number
    public detail: any
    public expected: boolean

    constructor(message: string, detail: any = {}) {
        super(message)
        this.name = 'ConflictExeption'
        this.httpCode = HTTP_STATUS_CONFLICT
        this.detail = detail || {}
    }
}
