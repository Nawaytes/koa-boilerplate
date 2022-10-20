import jwt from 'jsonwebtoken'
import koaJwt from 'koa-jwt'
import { appConfig } from '../../config/app'
import { ApplicationError } from '../helper/error_handler'
import Koa from 'koa'

export const checkToken = koaJwt({ secret: appConfig.secret })
export const optionalCheckToken = koaJwt({
    secret: appConfig.secret,
    passthrough: true,
})

export function getToken(ctx: Koa.DefaultContext, isOptional: boolean) {
    if (!ctx.header || !ctx.header.authorization) {
        return
    }

    const parts = ctx.header.authorization.trim().split(' ')

    if (parts.length === 2) {
        const scheme = parts[0]
        const credentials = parts[1]

        if (/^Bearer$/i.test(scheme)) {
            return credentials
        }
    }

    if (!isOptional) {
        throw new ApplicationError({
            type: 'AuthenticationError',
            message: 'bad_authorization_header_format',
        })
    }
}

// tslint:disable: variable-name
export function jwtMiddleware(isOptional = false, need_permissions = []) {
    return async (ctx: Koa.DefaultContext, next: () => any) => {
        const token = getToken(ctx, isOptional)

        if (!token && !isOptional) {
            throw new ApplicationError({
                type: 'AuthenticationError',
                message: 'token_not_found',
            })
        }

        let decodedToken

        try {
            decodedToken = jwt.verify(token, process.env.SECRET, {
                issuer: 'Polishmall-Travel-API',
            })
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new ApplicationError({
                    type: 'AuthenticationError',
                    message: 'token_expired',
                })
            }
            throw new ApplicationError({
                type: 'AuthenticationError',
                message: 'invalid_access_token',
            })
        }
        if (decodedToken.type !== 'access') {
            throw new ApplicationError({
                type: 'AuthenticationError',
                message: 'token_type_is_not_access_token',
            })
        }

        ctx.state.user = decodedToken
        await isHasPermissions(need_permissions, decodedToken.permissions)
        await next()
    }
}

const checkPermission = async (need_permissions, has_permissions) => {
    for (const permission of need_permissions) {
        if (has_permissions.indexOf(permission) !== -1) {
            return true
        }
    }

    return false
}

const isHasPermissions = async (need_permissions, has_permissions) => {
    const isSuperAdmin = has_permissions.filter((permission) => {
        return permission === 'superadmin_access'
    })
    if (isSuperAdmin.length) {
        return
    }
    if (
        need_permissions &&
        !(await checkPermission(need_permissions, has_permissions))
    ) {
        throw new ApplicationError({
            type: 'AuthenticationError',
            message: 'permission_denied',
        })
    }
}
