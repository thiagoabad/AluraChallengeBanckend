const { DataTypes } = require('sequelize');
const { sequelize } = require("../db")

const ExpensesCategories = sequelize.define('categorias_de_despesas', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {});

  module.exports = ExpensesCategories;