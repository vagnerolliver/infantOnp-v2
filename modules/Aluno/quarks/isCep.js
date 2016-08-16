'use strict';

module.exports = (value) => {
  const regex = /^[0-9]{8}$/;
  const valueReplace = value.replace(/\.|\-/g, '');
  const isCep = regex.test(valueReplace);

  const isEmpty = require('./isEmpty')(value);
  const isString = require('./isString')(value);

  // if(!isEmpty && isString) {
  //   value = value.replace(/\.|\-/g, '');
  //   const isCep = regex.test(value);
  //   if(isCep) return true;
  // }
  if(isEmpty) return false;
  if(!isString) return false;

  //return false;
  return isCep;
}
