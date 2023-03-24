const express = require('express');
const { productsController } = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/:id', productsController.getProduct)
  .get('/', productsController.listProducts)
  .post('/', validateNewProductFields, productsController.createProduct)
  .put('/:id', validateNewProductFields, productsController.updateProduct)
  .delete('/:id', productsController.deleteProduct);

module.exports = router;