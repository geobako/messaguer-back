const { statusToText } = require('./errorHandling');

class ResponseObject {
    constructor(statusCode, data) {
        this.meta = {
            status: 'OK',
            statusInfo: statusToText[statusCode],
            statusCode
        };
        this.data = data;
    }
}

module.exports = {
    ResponseObject
};
