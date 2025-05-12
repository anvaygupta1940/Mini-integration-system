// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error("error handler middleware of CRM server", err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
