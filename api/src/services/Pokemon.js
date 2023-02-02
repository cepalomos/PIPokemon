const { Pokemon, Type } = require('../db');
const axios = require('axios');

const createPokemonDb = async (data) => {
  const { user: userData, types } = data;
  try {
    const [user, create] = await Pokemon.findOrCreate({
      where: userData
    });
    if (create) {
      await user.setTypes(types);
      const typesDb = await user.getTypes();
      const auxTypes = typesDb.map(({ dataValues: { id, name } }) => ({ id, name }));
      return { ...user.dataValues, types: auxTypes };
    }
    throw { status: 500, message: "Pokemon ya existe en la base de datos" };
  } catch (error) {
    throw { status: 500, message: error }
  }
};

const getPokemons = async (name = undefined) => {
  try {
    if (name) {
      console.log('name');
      const pokemonDb = await Pokemon.findAll({
        attributes: ['id', 'name', 'attack'],
        where: {
          name
        },
        include: [{
          model: Type,
        }]
      });
      if (pokemonDb.length) {
        // console.log(pokemonDb[0].dataValues.types[0].dataValues.name);
        const typesDb = pokemonDb[0].dataValues.types.map(({ dataValues: { name } }) => ({ name }));
        return { ...pokemonDb[0].dataValues, types: typesDb };
      }
      const pokemonApi = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (pokemonApi.status === 200) {
        const { id, name, stats, types: typesApi, sprites: { other: { dream_world: { front_default: imagen } } } } = pokemonApi.data;
        const [, attackApi] = stats;
        const { base_stat: attack } = attackApi;
        const types = typesApi.map(({ type: { name } }) => ({ name }));
        const pokemon = { id, name, attack, types, imagen };
        return pokemon;
      }
      throw { status: 400, message: "No existe el pokemon" }
    } else {
      const pokemonDb = await Pokemon.findAll(
        {
          attributes: ['id', 'name', 'attack'],
          include: [{
            model: Type
          }]
        }
      );
      return pokemonDb.reduce((pokemons,pokemon)=>{
        const types = pokemon.dataValues.types.map(({dataValues:{name}})=>({name}));
        return [...pokemons,{...pokemon.dataValues,types}]
      },[]);
    }
  } catch (error) {
    console.log(error);
    throw { status: 500, message: error }
  }
};

module.exports = { createPokemonDb, getPokemons }