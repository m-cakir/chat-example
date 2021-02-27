const ioredis = require('ioredis');

const log = require('./logger')('redis');
const { ENVIRONMENT_VARIABLE } = require('./constants');

const redis = new ioredis.Cluster(
    JSON.parse(ENVIRONMENT_VARIABLE.REDIS_HOSTS),
    {
        redisOptions: {
            // password: ENVIRONMENT_VARIABLE.REDIS_PASSWORD,
            scaleReads: 'slave'
        }
    }
);

redis.on('connect', () => log.debug('connected'));

redis.on('error', (err) => log.error('error happened, error = ', err));

redis.on('disconnect', () => log.debug('disconnected'));

module.exports = { redis };