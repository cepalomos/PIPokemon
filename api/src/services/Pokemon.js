const {Pokemon,Type} =require('../db');
const axios = require('axios');

const createPokemonDb= async(data)=>{
  const {user:userData,types}=data;
  try {
    const [user,create] = await Pokemon.findOrCreate({
      where:userData
    });
    if(create){
      await user.setTypes(types);
      const typesDb = await user.getTypes();
      const auxTypes = typesDb.map(({dataValues:{id,name}})=>({id,name}));
      return {...user.dataValues,...auxTypes};
    }
    throw {status:500,message:"Pokemon ya existe en la base de datos"};
  } catch (error) {
    throw {status:500,message:error}
  }
};

module.exports = {createPokemonDb}