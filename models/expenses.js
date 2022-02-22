const { DataTypes } = require('sequelize');
const { sequelize } = require("../db")
const ExpensesCategories = require("../models/categories")

const Expenses = sequelize.define('despesas', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
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

  Expenses.hasOne(ExpensesCategories, { foreignKey: 'id' })

  module.exports = Expenses;