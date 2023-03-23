const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/:id', productsController.getProduct)
  .get('/', productsController.listProducts)
  .delete('/:id', productsController.deleteProduct);

module.exports = router;