const statusMessages = {
    '200': 'OK',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error',    
};

exports.success = function (req, res, message, details, status) {
    console.log('[response log] ' + details);
    let statusCode = status;
    let statusMessage = message;

    if(!status) {
        statusCode = 200;
    }
    
    if(!message) {
        statusMessage = statusMessages[statusCode];
    }

    res.status(statusCode).send({
        error: '',
        body: statusMessage
    });
}

exports.error = function (req, res, message, details, status) {
    console.error('[response error] ' + details);
    let statusCode = status;
    let statusMessage = message;

    if(!status) {
        statusCode = 500;
    }
    
    if(!message) {
        statusMessage = statusMessages[statusCode];
    }

    res.status(statusCode).send({
        error: statusMessage,
        body: ''
    });
}
