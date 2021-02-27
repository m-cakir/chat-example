const app = require('express')();
const bodyParser = require('body-parser');
const { inspect } = require('util');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/static', require('express').static(require('path').join(__dirname, '../public')));

app.use((req, res, next) => {

    const method = req.method;
    const url = req.baseUrl + req.path;
    const payload = req.body;
    const params = req.query;

    const log = require('./logger')(`${method}:${url}`);

    log.info(`query-params=${inspect(params)}, payload=${inspect(payload)}`);

    res.on('finish', function () {
        log.info(`response status=${this.statusCode}`);
    });

    req._logger = log;

    next();
});

app.use('/', require('./routes/index'));
app.use('/ping', require('./routes/ping'));

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;