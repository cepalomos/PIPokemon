const {Router} = require('express');
const router = Router();
const {postPokemon,getPokemon,getPokemonByPk} = require('../controller/Pokemon');

router.route('/').post(postPokemon).get(getPokemon);
router.route("/:id").get(getPokemonByPk);

module.exports = router