const {createPokemonDb} = require('../services/Pokemon')

const postPokemon = async(req,res,next)=>{
  const data = req.body;
  try {
    const pokemon= await createPokemonDb(data);
    res.status(201).json(pokemon);
  } catch (error) {
    next(error)
  }
};

module.exports = {postPokemon}