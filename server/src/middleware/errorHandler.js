function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    res.status(err.status || 500);
    res.json({
        status: err.status  || 500,
        message: err.message,
    });
}

module.exports = errorHandler;