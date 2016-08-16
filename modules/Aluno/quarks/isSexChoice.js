'use strict';

module.exports = (value) => {

  const isTRUE = (value === "masculino");
  const isFALSE = (value === "feminino");

  if (isTRUE || isFALSE) return true;
  return false;

}
