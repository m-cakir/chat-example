
const cuid = require('cuid');
const winston = require('winston');

const { ENVIRONMENT_VARIABLE } = require('./constants');

module.exports = (name) => {

    const txid = cuid();
    const hostname = ENVIRONMENT_VARIABLE.HOSTNAME;

    return winston.createLogger({
        format: winston.format.combine(
            winston.format.label({
                label: name,
                message: true
            }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:SSZ' }),
            winston.format.splat(),
            winston.format.printf((info) => {
                return `${info.timestamp} | ${hostname} | ${info.level.toUpperCase()} | ${txid} | ${info.message}`;
            })
        ),
        transports: [new winston.transports.Console({ level: 'info' })]
    });
}