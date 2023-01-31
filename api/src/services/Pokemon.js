const {Pokemon,Type} =require('../db');
const axios = require('axios');

const createPokemonDb= async(data)=>{
  try {
    
  } catch (error) {
    throw {status:500,message:error}
  }
};

module.exports = {createPokemonDb}