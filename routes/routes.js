const express = require('express')
const router = express.Router();
const incomes = require("./incomes")
const expenses = require('./expenses');
const { getMonthResume } = require('../controllers/resume')

router.use('/incomes', incomes);
router.use('/expenses', expenses);

router.get('/resume/:ano/:mes', async (req, res) => {
    const result = await getMonthResume(parseInt(req.params.mes), parseInt(req.params.ano))
    .catch(err => res.status(500).send(err))
    res.send(result)
})
 
module.exports = router;
