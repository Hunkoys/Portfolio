// This file is an injector

window.isString = function (value) {
  return typeof value === 'string' || value instanceof String;
};

window.isNumber = function (value) {
  return !isNaN(value) || value instanceof Number;
};

window.isFunction = function (functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};
