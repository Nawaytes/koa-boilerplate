// tslint:disable:no-var-requires
const packageJson = require('../package.json');

export const appConfig = {
    name: packageJson.name,
    port: process.env.PORT,
    secret: process.env.SECRET,
    upload_dir : __dirname + '/../uploads',
    validation_message: {
        custom_example: 'Custom Error Example'
    },
    error_reporting: {
        sentry: {}
    },
    logging: {
        enabled: typeof process.env.LOG === 'undefined' ? true : process.env.LOG === 'yes',
        loggy: {
            token: 'token',
            subdomain: 'subdomain',
        }
    }
};
