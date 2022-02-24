const assert = require('chai').assert
const { 
  insertExpense,
  updateExpense, 
  removeExpense, 
  findAllExpenses, 
  findOneExpense, 
  findExpensesByDate
} = require("../../controllers/expenses")

function suite() {
  describe('CRUD', function() {
    it('Insert one expense', async function() {
      const expense = await insertExpense({	
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
      const expense = await updateExpense({	
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
      const expense = await findOneExpense(1)
      assert.equal(expense.descricao, "changedTest", 'Field descrição')
      assert.equal(expense.valor, 1.03, 'Field valor')
      assert.equal(expense.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
      assert.equal(expense.id_categoria, 1, 'Field id_categoria')
    })
    it('Retrieve all expenses', async function() {
      await insertExpense({	
        "descricao": "test",
        "valor": 1.03,
        "data": "2022-02-08",
        "id_categoria": 1
      })
      await insertExpense({	
        "descricao": "test",
        "valor": 1.03,
        "data": "2022-03-08",
        "id_categoria": 1
      })
      assert.lengthOf(await findAllExpenses(), 3, 'Should have length 3')
    })
    it('Retrieve all expenses in date range', async function() {
      const expenses = await findExpensesByDate(2, 2022)
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
      const expense = await removeExpense(1)
      assert.equal(expense.message, "deleted", 'Message deleted')
      assert.lengthOf(await findAllExpenses(), 2, 'Should have length 2')
    })
  })
}

module.exports = suite