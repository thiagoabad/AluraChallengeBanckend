const express = require('express')
const router = express.Router();
const Incomes = require("../models/incomes")

router.get('/', (req, res) => {
    Incomes.findAll().then(queryRes => res.send(queryRes));
})
router.get('/:id', (req, res) => {
    //TODO validation
    //TODO return 404
    Incomes.findAll({
        where: { id: req.params.id }
      }).then(queryRes => res.send(queryRes));
})
router.post('/', (req, res) => {
    //TODO auto increment
    //TODO validation
    Incomes.create(req.body).then(income => res.send(income))
})
router.put('/:id', (req, res) => {
    //TODO validation
    //TODO return 404
    //TODO return updated model
    Incomes.update(req.body, {
        where: {
          id: req.body.id
        }
    }).then(queryRes => res.send(queryRes));
})
router.delete('/:id', (req, res) => {
    //TODO validation
    //TODO return 404
    Incomes.destroy({
        where: { id: req.params.id }
      }).then(() => res.send({message: "deleted"}));
})
 
module.exports = router;
