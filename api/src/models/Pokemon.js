const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 1
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 1,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 1,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 1,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 1,
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 1,
      }
    },
  },{timestamps:false});
};
