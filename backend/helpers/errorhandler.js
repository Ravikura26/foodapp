

const errorHandler = (err, req, res, next) => { 
    console.error(err.stack);
   
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
  
    // Handle specific error types (optional)
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation Error: ' + err.message;
    } else if (err.name === 'CastError') {
      statusCode = 400;
      message = 'Invalid ID format';
    } else if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }
  
    // Send the error response
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorHandler;
  