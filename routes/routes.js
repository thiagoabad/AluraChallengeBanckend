const express = require('express')
const router = express.Router();
const incomes = require("./incomes")
const expenses = require('./expenses');
const Incomes = require("../models/incomes")
const Expenses = require("../models/expenses");
const ExpensesCategories = require("../models/categories");
const { Op, Sequelize } = require("sequelize");

router.use('/incomes', incomes);
router.use('/expenses', expenses);

function round(num){
    return Math.round( num * 100 + Number.EPSILON ) / 100
}

router.get('/resumo/:ano/:mes', async (req, res) => {
    //Valor total das receitas no mês
    //Valor total das despesas no mês
    //Saldo final no mês
    //Valor total gasto no mês em cada uma das categorias
    const initialDate = new Date(`${req.params.ano}-${req.params.mes}`)
    initialDate.setDate(1)
    const endDate = new Date(`${req.params.ano}-${req.params.mes}`)
    endDate.setMonth(endDate.getMonth() + 1)
    endDate.setDate(0)
    //TODO validation
    console.log(initialDate.toISOString())
    console.log(endDate.toISOString())
    query = { data: {
        [Op.between]: [initialDate.toISOString(), endDate.toISOString()]
    }}
    const incomes = await Incomes.findAll({where: {...query}}).catch(err => res.status(500).send(err))
    const expenses = await Expenses.findAll({where: {...query}}).catch(err => res.status(500).send(err))
    const totalIncome = round(incomes.reduce((previousValue, currentIncome) => previousValue + currentIncome.valor, 0))
    const totalExpense = round(expenses.reduce((previousValue, currentIncome) => previousValue + currentIncome.valor, 0))
    const totalMonth = round(totalIncome - totalExpense)
    const categories = await ExpensesCategories.findAll().catch(err => res.status(500).send(err))
    const categoriesSumP = categories.map(async category => {
        return await Expenses.findOne({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('valor')), 'total'],
                "id_categoria"
            ],
            where: { 
                id_categoria: `${category.id}`
            },
            group: "id_categoria"
        })
    })
    console.log(categories)
    Promise.all(categoriesSumP).then(categoriesSums => {
        const values = categoriesSums.map(categoriesSum => {
            if (!!categoriesSum) {
                console.log(categoriesSum)
                return JSON.parse(JSON.stringify(categoriesSum))
            } else {
                return false    
            }
        }).filter(x => !!x)
        const values2 = values.map(categoriesSum => {return {
            category: categoriesSum.id_categoria,
            total: categoriesSum.total
        }})
        res.send({totalIncome, totalExpense, totalMonth, values2})
    })

})
 
module.exports = router;
