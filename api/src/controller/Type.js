const {getTypes:getTypesDb} = require('../services/Type');

const getTypes = async(req,res,next)=>{
  try {
    const types = await getTypesDb();
    res.status(200).json(types);
  } catch (error) {
    next(error)
  }
};

module.exports={getTypes};