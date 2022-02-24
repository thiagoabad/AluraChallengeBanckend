const assert = require('chai').assert
const { 
  insertIncome, 
  updateIncome, 
  removeIncome, 
  findAllIncomes, 
  findOneIncome, 
  findIncomesByDate 
} = require("../../controllers/incomes")

function suite() {
  describe('CRUD', function() {
    it('Insert one income', async function() {
      const income = await insertIncome({	
        "descricao": "test",
        "valor": 1.03,
        "data": "2022-02-08"
      })
      assert.equal(income.descricao, "test", 'Field descrição')
      assert.equal(income.valor, 1.03, 'Field valor')
      assert.equal(income.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
    })
    it('Update one income', async function() {
      const income = await updateIncome({	
        "descricao": "changedTest",
        "valor": 1.03,
        "data": "2022-02-08"
      }, 1)
      assert.equal(income.descricao, "changedTest", 'Field descrição')
      assert.equal(income.valor, 1.03, 'Field valor')
      assert.equal(income.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
    })
    it('Retrieve inserted income', async function() {
      const income = await findOneIncome(1)
      assert.equal(income.descricao, "changedTest", 'Field descrição')
      assert.equal(income.valor, 1.03, 'Field valor')
      assert.equal(income.data.toISOString(), '2022-02-08T00:00:00.000Z', 'Field data')
    })
    it('Retrieve all incomes', async function() {
      await insertIncome({	
        "descricao": "test",
        "valor": 1.03,
        "data": "2022-02-08"
      })
      await insertIncome({	
        "descricao": "test",
        "valor": 1.03,
        "data": "2022-03-08"
      })
      assert.lengthOf(await findAllIncomes(), 3, 'Should have length 3')
    })
    it('Retrieve all incomes in date range', async function() {
      const incomes = await findIncomesByDate(2, 2022)
      assert.typeOf(incomes, 'array')
      incomes.forEach(element => {
        assert.equal(element.data.toISOString().substring(5, 7), '02', 'Should be 02')
      })
      incomes.forEach(element => {
        assert.equal(element.data.toISOString().substring(0, 4), '2022', 'Should be 2022')
      })
      assert.lengthOf(incomes, 2, 'Should have length 2')
    })
    it('Delete one income', async function() {
      const income = await removeIncome(1)
      assert.equal(income.message, "deleted", 'Message deleted')
      assert.lengthOf(await findAllIncomes(), 2, 'Should have length 2')
    })
  })
}

module.exports = suite