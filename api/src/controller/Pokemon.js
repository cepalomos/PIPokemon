const {createPokemonDb,getPokemons,getPokemonPk} = require('../services/Pokemon')

const postPokemon = async(req,res,next)=>{
  const data = req.body;
  try {
    const pokemon= await createPokemonDb(data);
    res.status(201).json(pokemon);
  } catch (error) {
    next(error)
  }
};

const getPokemon = async(req,res,next)=>{
  const {name} = req.query;
  try {
      const pokemon = await getPokemons(name);
      res.status(200).json(pokemon)
  } catch (error) {
    next(error);
  }
};

const getPokemonByPk = async (req,res,next)=>{
  const {id} = req.params;
  try {
    const pokemon = await getPokemonPk(id);
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
}

module.exports = {postPokemon,getPokemon,getPokemonByPk}