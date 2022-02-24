const express = require('express')
const router = express.Router()
const { 
    findAllIncomes, 
    insertIncome, 
    updateIncome, 
    removeIncome, 
    findOneIncome, 
    findIncomesByDate 
} = require("../controllers/incomes")

router.get('/', async (req, res) => {
    const result = await findAllIncomes(req.query.description)
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.get('/:ano/:mes', async (req, res) => {
    //TODO validation
    const result = await findIncomesByDate(parseInt(req.params.mes), parseInt(req.params.ano))
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.get('/:id', async (req, res) => {
    const result = await findOneIncome(req.params.id)
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
    const result = await insertIncome(req.body)
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.put('/:id', async (req, res) => {
    //TODO validation
    const result = await updateIncome(req.body, req.params.id)
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
    const result = await removeIncome(req.params.id)
    if (err == 404) {
        res.status(404).send()
    } else {
        res.status(500).send(err)
    }
    res.send(result)
})

module.exports = router
