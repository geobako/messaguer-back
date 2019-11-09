const httpStatus = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERVAL_SERVER_ERROR: 500
};

const statusToText = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Interval Server Error'
};

class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    if (!statusCode) {
        return res.status(httpStatus.INTERVAL_SERVER_ERROR).json({
            status: 'error',
            statusInfo: statusToText[500],
            statusCode: 500,
            message: 'Interval server error'
        });
    }
    return res.status(statusCode).json({
        status: 'error',
        statusInfo: statusToText[statusCode],
        statusCode,
        message
    });
};

module.exports = {
    CustomError,
    handleError,
    httpStatus,
    statusToText
};
