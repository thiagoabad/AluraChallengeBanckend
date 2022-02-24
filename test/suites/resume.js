const assert = require('chai').assert
const { insertExpense } = require("../../controllers/expenses")
const { insertIncome } = require("../../controllers/incomes")
const { getMonthResume } = require("../../controllers/resume")
const Expenses = require("../../models/expenses")
const Incomes = require("../../models/incomes")

function suite() {
  before(async function() {
    await Expenses.destroy({
      where: {},
      truncate: true
    })
    await Incomes.destroy({
        where: {},
        truncate: true
      })
    console.log('Cleanup done')
  })

  describe('Others', function() {
    it('Get month resume', async function() {
        await insertExpense({	
            "descricao": "test1",
            "valor": 1.03,
            "data": "2022-02-08",
            "id_categoria": 1
        })
        await insertExpense({	
            "descricao": "test2",
            "valor": 1.03,
            "data": "2022-02-08",
            "id_categoria": 1
        })
        await insertIncome({	
            "descricao": "test3",
            "valor": 1.03,
            "data": "2022-02-08"
        })
        await insertIncome({	
            "descricao": "test4",
            "valor": 1.03,
            "data": "2022-03-08"
        })
        const resume1 = await getMonthResume(2, 2022)
        assert.equal(resume1.totalIncomes, 1.03, 'Should be 1.03')
        assert.equal(resume1.totalExpenses, 2.06, 'Should be 2.06')
        assert.equal(resume1.totalMonth, -1.03, 'Should be -1.03')
        assert.lengthOf(resume1.expensesByCategory, 1, 'Should have length 1')
        assert.equal(resume1.expensesByCategory[0].category, "Alimentação", 'Should be Alimentação')
        assert.equal(resume1.expensesByCategory[0].total, 2.06, 'Should be 2.06')
        const resume2 = await getMonthResume(3, 2022)
        assert.equal(resume2.totalIncomes, 1.03, 'Should be 1.03')
        assert.equal(resume2.totalExpenses, 0, 'Should be 0')
        assert.equal(resume2.totalMonth, 1.03, 'Should be 1.03')
        assert.lengthOf(resume2.expensesByCategory, 0, 'Should have length 0')
      })
    })
  }
  
  module.exports = suite