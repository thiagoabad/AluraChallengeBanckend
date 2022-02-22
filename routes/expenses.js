const express = require('express')
const router = express.Router();
const { findAll, insert, update, remove, findOne, findByDate } = require("../controllers/expenses")

router.get('/', async (req, res) => {
    const result = await findAll(req.query.description)
    .catch(err => res.status(500).send(err))
    res.send(result)
})

router.get('/:ano/:mes', async (req, res) => {
    //TODO validation
    const result = await findByDate(parseInt(req.params.mes), parseInt(req.params.ano))
    .catch(err => res.status(500).send(err))
    res.send(result)
})
router.get('/:id', async (req, res) => {
    const result = await findOne(req.params.id)
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
    const result = await insert(req.body)
    .catch(err => res.status(500).send(err))
    res.send(result)
})
router.put('/:id', async (req, res) => {
    //TODO validation
    const result = await update(req.body, req.params.id)
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
    const result = await remove(req.params.id)
    if (err == 404) {
        res.status(404).send()
    } else {
        res.status(500).send(err)
    }
    res.send(result)
})
 
module.exports = router;