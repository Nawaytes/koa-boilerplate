// tslint:disable:no-var-requires

export const appConfig = {
    name: process.env.APP_NAME || 'KOA-BOILERPLATE',
    port: process.env.PORT || 3000,
    secret: process.env.SECRET,
    upload_dir: __dirname + '/../uploads',
    validation_message: {
        custom_example: 'Custom Error Example',
    },
    error_reporting: {
        sentry: {},
    },
    logging: {
        enabled:
            typeof process.env.LOG === 'undefined'
                ? true
                : process.env.LOG === 'yes',
        loggy: {
            token: 'token',
            subdomain: 'subdomain',
        },
    },
}
