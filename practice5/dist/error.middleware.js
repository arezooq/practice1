"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, req, res, next) {
    const status = error.status || 404;
    const message = error.message || 'Not Found!';
    res.status(status).send({
        status,
        message
    });
}
exports.default = errorMiddleware;
