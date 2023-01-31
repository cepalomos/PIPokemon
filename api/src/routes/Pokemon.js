const {Router} = require('express');
const router = Router();
const {postPokemon} = require('../controller/Pokemon');

router.route('/').post(postPokemon);

module.exports = router