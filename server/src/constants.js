module.exports = Object.freeze({

    ENVIRONMENT_VARIABLE: Object.freeze({
        DEBUG: process.env.DEBUG,
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 3000,
        REDIS_HOSTS: process.env.REDIS_HOSTS,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        HOSTNAME: process.env.HOSTNAME || 'APP_DEFAULT',
        CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
    })

});