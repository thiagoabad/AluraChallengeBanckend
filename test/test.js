const assert = require('chai').assert
const { insert, update, remove, findAll, findOne, findByDate } = require("../controllers/expenses")
const { sequelize, runMigration } = require("../db")
const Expenses = require("../models/expenses")

before(async function() {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
  await runMigration
      .catch(error => {
          console.log(error)
      })
  Expenses.destroy({
    where: {},
    truncate: true
    })
})

describe('Expenses', function() {
  it('Insert one expense', async function() {
    const expense = await insert({	
      "descricao": "test",
      "valor": 1.03,
      "data": "2022-02-08",
      "id_categoria": 1
    })
    assert.equal(expense.descricao, "test", 'Field descrição')
    assert.equal(expense.valor, 1.03, 'Field valor')
    assert.equal(expense.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
    assert.equal(expense.id_categoria, 1, 'Field id_categoria')
  })
  it('Update one expense', async function() {
    const expense = await update({	
      "descricao": "changedTest",
      "valor": 1.03,
      "data": "2022-02-08",
      "id_categoria": 1
    }, 1)
    assert.equal(expense.descricao, "changedTest", 'Field descrição')
    assert.equal(expense.valor, 1.03, 'Field valor')
    assert.equal(expense.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
    assert.equal(expense.id_categoria, 1, 'Field id_categoria')
  })
  it('Retrieve inserted expense', async function() {
    const expense = await findOne(1)
    assert.equal(expense.descricao, "changedTest", 'Field descrição')
    assert.equal(expense.valor, 1.03, 'Field valor')
    assert.equal(expense.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
    assert.equal(expense.id_categoria, 1, 'Field id_categoria')
  })
  it('Retrieve all expenses', async function() {
    await insert({	
      "descricao": "test",
      "valor": 1.03,
      "data": "2022-02-08",
      "id_categoria": 1
    })
    await insert({	
      "descricao": "test",
      "valor": 1.03,
      "data": "2022-03-08",
      "id_categoria": 1
    })
    assert.lengthOf(await findAll(), 3, 'Should have length 3')
  })
  it('Retrieve all expenses in date range', async function() {
    const expenses = await findByDate(2, 2022)
    assert.typeOf(expenses, 'array')
    expenses.forEach(element => {
      assert.equal(element.data.toISOString().substring(5, 7), '02', 'Should be 02')
    })
    expenses.forEach(element => {
      assert.equal(element.data.toISOString().substring(0, 4), '2022', 'Should be 2022')
    })
    assert.lengthOf(expenses, 2, 'Should have length 2')
  })
  it('Delete one expense', async function() {
    const expense = await remove(1)
    assert.equal(expense.message, "deleted", 'Message deleted')
    assert.lengthOf(await findAll(), 2, 'Should have length 2')
  })
})