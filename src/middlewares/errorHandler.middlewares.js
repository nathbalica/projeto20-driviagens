import httpStatus from 'http-status';

function errorHandler(err, req, res, next) {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
    message: err.message
  });
}

export default errorHandler;
