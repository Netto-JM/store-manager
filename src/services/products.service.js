const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const deleteById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.deleteById(productId);

  return { type: null };
};

const createProduct = async (productName) => {
  const error = schema.validateNewProduct(productName);
  if (error.type) return error;

  const newProductId = await productsModel.insert(productName);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateById = async (productId, productName) => {
  const errorId = schema.validateId(productId);
  if (errorId.type) return errorId;

  const errorName = schema.validateNewProduct(productName);
  if (errorName.type) return errorName;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.updateById(productId, productName);
  const updatedProduct = await productsModel.findById(productId);

  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  deleteById,
  createProduct,
  updateById,
};