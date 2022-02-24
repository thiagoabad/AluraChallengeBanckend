const { sequelize, runMigration } = require("../db")
const Expenses = require("../models/expenses")
const Incomes = require("../models/incomes")

before(async function() {
    console.log('Starting tests')
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await runMigration
        .catch(error => {
            console.log(error)
        })
    await Expenses.destroy({
      where: {},
      truncate: true
    })
    await Incomes.destroy({
        where: {},
        truncate: true
      })
    console.log('Ready to test')
})
