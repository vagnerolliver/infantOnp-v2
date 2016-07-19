'use strict';

module.exports = (err, data, res) => {
  console.log(err, data)
  if (err){
   res.json(err);
   return console.log('Erro:', err);
  } else {
  	res.json(data);
  } 
};
