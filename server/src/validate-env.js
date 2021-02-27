const joi = require('joi');
const { inspect } = require('util');

const { ENVIRONMENT_VARIABLE } = require('./constants');
const log = require('./logger')('validate-env');

const schema = joi
    .object()
    .keys({
        NODE_ENV: joi.string().valid("production", "development", "test").required(),
        PORT: joi.number().positive().required(),
        REDIS_HOSTS: joi.string().required().custom((value, helpers) => {

            try {

                if (Array.isArray(JSON.parse(value))) {
                    return value;
                }

            } catch (e) {
            }

            return helpers.error('any.invalid');

        }, 'check string is json'),
        CORS_ORIGIN: joi.string().regex(/(http)\:\/\/[a-z]+\:[0-9]{4}/)
    })
    .unknown();

module.exports = function () {

    log.info(`environment variables = ${inspect(ENVIRONMENT_VARIABLE)}`);

    const { error } = schema
        .prefs({ errors: { label: 'key' } })
        .validate(ENVIRONMENT_VARIABLE);

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
};