const ValidationError = (message = '') => {
  this.name = 'ValidationError';
  this.message = message;
}

ValidationError.prototype = Error.prototype;

exports.ValidationError = ValidationError
