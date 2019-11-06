// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let error = 'Internal Server Error';

  // Mongoose Validation Error?
  if(err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
    error = err.message;
  }
  
  else if(err.statusCode) { 
    statusCode = err.statusCode;
    error = err.error;
  }
  // or something unexpected?
  else {
    console.log('UNEXPECTED ERROR', err);
  }

  console.log('ERROR', statusCode, error);

  res.status(statusCode).send({ error });
};
