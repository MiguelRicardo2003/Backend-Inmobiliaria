// middlewares/ErrorHandler.middleware.js
export default function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
} 