import { HTTP_STATUS_NOT_FOUND } from '../error_handler'

export default class NotFoundException extends Error {
    public type: string
    public httpCode: number
    public detail: any
    public expected: boolean

    constructor(message: string, detail: any = {}) {
        super(message)
        this.name = 'NotFoundException'
        this.httpCode = HTTP_STATUS_NOT_FOUND
        this.detail = detail || {}
    }
}
