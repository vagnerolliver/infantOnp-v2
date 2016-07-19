'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');
const Create = require('./brainCreate')(Organism);
const Find = require('./brainFind')(Organism);
const FindOne = require('./brainFindOne')(Organism);
const Update = require('./brainUpdate')(Organism);
const Remove = require('./brainRemove')(Organism);

router.get('/', Find);
router.get('/:id', FindOne);
router.post('/', Create);
router.put('/:id', Update);
router.delete('/:id', Remove);

//route middleware to make sure a user is logged in
function isLoggedIn(req, res,next){

  //if user is authenticated in the session carry on
  if(req.isAuthenticated())
  {
      return next();
  }

  //if they aren't edirect them to the home page.
  res.redirect('/#');
}



module.exports = router;