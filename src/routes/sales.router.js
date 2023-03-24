const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/:id', salesController.getSale)
  .get('/', salesController.listSales)
  .delete('/:id', salesController.deleteSale);

module.exports = router;