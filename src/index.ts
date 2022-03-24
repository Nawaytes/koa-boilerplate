import * as dotenv from 'dotenv';
dotenv.config();
import {appConfig} from '../config/app';
import app from './app';
import {errorHandler, isExpectedError} from './helper/error_handler';
import {createLogger} from './helper/logger';

const log = createLogger('server', 'server');

process.on('uncaughtException', async (error) => {
    await errorHandler(error);
    if (!isExpectedError(error)) {
        process.exit(1);
    }
});

process.on('unhandledRejection', (reason, p) => {
    throw reason;
});

export const createServer = async () => {

    return app.listen({ port: appConfig.port }, () => {
        // tslint:disable:no-console
        log.info(`🚀 Server ready at http://localhost:${appConfig.port}`);
    });
};

createServer();
