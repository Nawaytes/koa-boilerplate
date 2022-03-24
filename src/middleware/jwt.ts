import * as koaJwt from 'koa-jwt';
import {appConfig} from '../../config/app';

export const checkToken = koaJwt({secret: appConfig.secret});
export const optionalCheckToken = koaJwt({secret: appConfig.secret, passthrough: true});
