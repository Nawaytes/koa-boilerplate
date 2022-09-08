import { ApplicationError } from './error_handler'
import BadRequestException from './Exception/BadRequestException'
import ConflictException from './Exception/ConflictException'
import NotFoundException from './Exception/NotFoundException'
import UnprocessableEntityException from './Exception/unprocessableEntity'
import ValidationErrorException from './Exception/ValidationErrorException'

export function processErrorResponse(error: any) {
    if (error instanceof NotFoundException) {
        throwApplicationError(error)
    }
    if (error instanceof BadRequestException) {
        throwApplicationError(error)
    }
    if (error instanceof ConflictException) {
        throwApplicationError(error)
    }
    if (error instanceof ValidationErrorException) {
        throwApplicationError(error)
    }
    if (error instanceof UnprocessableEntityException) {
        throwApplicationError(error)
    }
    throw error
}

function throwApplicationError(error: any) {
    throw new ApplicationError({
        message: error.message,
        type: error.name,
        httpCode: error.httpCode,
        detail: error.detail,
    })
}
