const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const types = require('./Types');
const pokemon = require('./Pokemon')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types',types);
router.use('/pokemons',pokemon)


module.exports = router;
