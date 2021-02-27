const SocketIO = require('socket.io');
const Logger = require('./logger');
const { redis } = require('./redis');
const { ENVIRONMENT_VARIABLE } = require('./constants');

module.exports = (server) => {

    // https://socket.io/docs/v3/using-multiple-nodes/index.html#Sticky-load-balancing
    const io = SocketIO(server, {
        cors: {
            origin: ENVIRONMENT_VARIABLE.CORS_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }

    });

    // https://socket.io/docs/v3/using-multiple-nodes#The-Redis-adapter
    io.adapter(require('socket.io-redis')({
        pubClient: redis,
        subClient: redis
    }));

    io.on('connection', (socket) => {

        const log = Logger('socket');

        log.debug(`connected`);

        socket.on('disconnect', (reason) => log.debug(`disconnected, reason = ${reason}`));

        socket.on('onMessage', (msg) => io.emit('onMessage', { ...msg, id: new Date().getTime() }));

    });
}