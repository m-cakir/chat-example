require('./src/validate-env')();

const { ENVIRONMENT_VARIABLE } = require('./src/constants');
const log = require('./src/logger')('server');

const app = require('./src/app');
const server = require('http').Server(app);

require('./src/socket')(server);

server.listen(ENVIRONMENT_VARIABLE.PORT || 3001, () => {
    log.info(`running on port= ${ENVIRONMENT_VARIABLE.PORT || 3001}`);
});