module.exports = {
    apps: [{
        name: 'cariparkir-parklocation-microservice',
        script: 'src/index.js',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 4000
        }
    }],
};
