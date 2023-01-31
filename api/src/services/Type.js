const { Type } = require('../db');
const axios = require('axios');

const getTypes = async () => {
  try {
    let types = await Type.findAll();
    if (types.length === 0) {
      const { data: { results } } = await axios('https://pokeapi.co/api/v2/type');
      types = await Type.bulkCreate(results.map(({ name }) => ({ name })));
      return types.map(({dataValues})=>dataValues);
    }
  } catch (error) {
    throw { status: 404, message: error }
  }
};

module.exports = { getTypes }