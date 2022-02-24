const express = require('express')
const router = express.Router()
const { 
    findAllExpenses, 
    insertExpense, 
    updateExpense, 
    removeExpense, 
    findOneExpense, 
    findExpensesByDate 
} = require("../controllers/expenses")

router.get('/', async (req, res) => {
    const result = await findAllExpenses(req.query.description)
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.get('/:ano/:mes', async (req, res) => {
    //TODO validation
    const result = await findExpensesByDate(parseInt(req.params.mes), parseInt(req.params.ano))
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.get('/:id', async (req, res) => {
    const result = await findOneExpense(req.params.id)
    .catch(err => {
        if (err == 404) {
            res.status(404).send()
        } else {
            res.status(500).send(err)
        }
    })
    res.send(result)
})

router.post('/', async (req, res) => {
    //TODO validation
    const result = await insertExpense(req.body)
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.put('/:id', async (req, res) => {
    //TODO validation
    const result = await updateExpense(req.body, req.params.id)
    .catch(err => {
        if (err == 404) {
            res.status(404).send()
        } else {
            res.status(500).send(err)
        }
    })
    res.send(result)
})

router.delete('/:id', async (req, res) => {
    const result = await removeExpense(req.params.id)
    if (err == 404) {
        res.status(404).send()
    } else {
        res.status(500).send(err)
    }
    res.send(result)
})
 
module.exports = router