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
      const pokemonDbNormalize = pokemonDb.reduce((pokemons, pokemon) => {
        const types = pokemon.dataValues.types.map(({ dataValues: { name } }) => ({ name }));
        return [...pokemons, { ...pokemon.dataValues, types }]
      }, []);
      const {
        data: { results: mid, next },
      } = await axios("https://pokeapi.co/api/v2/pokemon");
      const {
        data: { results: final },
      } = await axios(next);
      const datos = [...mid, ...final];
      const pokemonsApi = await Promise.all(
        datos.map(({ url }) => {
          return new Promise((resolve, reject) => {
            axios(url)
              .then(
                ({
                  data: {
                    id,
                    name,
                    stats,
                    types: typesApi,
                    sprites: {
                      other: {
                        dream_world: { front_default: imagen },
                      },
                    },
                  },
                }) => {
                  const [, attackApi] = stats;
                  const { base_stat: attack } = attackApi;
                  const types = typesApi.map((el) => ({ name: el.type.name }));
                  resolve({ id, name, types, imagen, attack });
                }
              )
              .catch((error) => reject(error));
          });
        })
      );
      return [...pokemonsApi, ...pokemonDbNormalize];
    }
  } catch (error) {
    console.log(error);
    throw { status: 500, message: error }
  }
};

const getPokemonPk = async (id) => {
  try {
    if (id.length > 8) {
      const pokemonDb = await Pokemon.findByPk(id, {
        include: [{
          model: Type,
          attributes: ["name"],
        }]
      });
      const { types: typesDb } = pokemonDb.dataValues;
      const types = typesDb.map(({ dataValues: { name } }) => ({ name }))
      return { ...pokemonDb.dataValues, types };
    } else {
      let { data, status } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      if (status === 200) {
        const {
          id,
          name,
          height,
          weight,
          stats,
          types: typesApi,
          sprites: {
            other: {
              dream_world: { front_default: image },
            },
          },
        } = data;
        const [lifeApi, attackApi, defenseApi, , , speedApi] = stats;
        const types = typesApi.map((el) => ({ name: el.type.name }));
        const { base_stat: life } = lifeApi;
        const { base_stat: attack } = attackApi;
        const { base_stat: defense } = defenseApi;
        const { base_stat: speed } = speedApi;
        return {
          id,
          name,
          height,
          weight,
          life,
          attack,
          defense,
          speed,
          types,
          image,
        };
      }
      throw { status: 400, message: "No existe el pokemon en la base datos de la api" };
    }
  } catch (error) {
    throw { status: error.status ?? 500, message: error }
  }
};

module.exports = { createPokemonDb, getPokemons, getPokemonPk }