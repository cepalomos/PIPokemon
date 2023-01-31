

const postPokemon = async(req,res,next)=>{
  const data = req.body;
  try {
    res.status(201).json({message:'ruta ok'});
  } catch (error) {
    next(error)
  }
};

module.exports = {postPokemon}