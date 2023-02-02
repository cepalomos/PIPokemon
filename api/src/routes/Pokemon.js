const {Router} = require('express');
const router = Router();
const {postPokemon,getPokemon} = require('../controller/Pokemon');

router.route('/').post(postPokemon).get(getPokemon);

module.exports = router