var constant = require('./constant'),
    customException = require('./customException'),
    logger = require('./logger').logger,
    APIResponse = require('./model/APIResponse');

function _sendResponse(response, result) {
    // send status code 200
    return response.send(result);
}

function sendError(response, error,request) {
    // if error doesn't has sc than it is an unhandled error,
    // log error, and throw intrnl server error
    if (!error.errorCode) {
        logger.error(error, "Unhandled error.");
        error = customException.intrnlSrvrErr(error);
    }
    var result = new APIResponse(constant.STATUS_CODE.ERROR, error,request);
    _sendResponse(response, result);
}

function handleError(error, request, response, next) {
    // unhandled error
    sendError(response, error,request);
}

function sendSuccess(response, result,request) {
    var result = new APIResponse(constant.STATUS_CODE.SUCCESS, result,request);
    _sendResponse(response, result);
}

// ========================== Export Module Start ==========================
module.exports = {
    sendError,
    handleError,
    sendSuccess,
}
// ========================== Export Module End ============================