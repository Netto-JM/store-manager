const productsModelMocks = require('../../models/mocks/products.model.mock')

const allProductsResponse = {
  type: null,
  message: productsModelMocks.allProductsResponse,
};

const singleProductResponse = {
  type: null,
  message: productsModelMocks.allProductsResponse[0],
};

const newProductId = 4;

const newProductName = 'NewProduct';

const newProductBody = {
  id: 4,
  name: newProductName,
};

const newProductResponse = {
  type: null,
  message: newProductBody,
};

const updatedProductName = 'UpdatedProduct';

const updatedProductBody = {
  id: 1,
  name: updatedProductName,
};

const updatedProductResponse = {
  type: null,
  message: updatedProductBody,
};

const invalidProductId = 1.5;

const invalidProductName = 'abc';

const invalidIdResponse = {
  type: 'INVALID_VALUE',
  message: '"id" must be a number',
};

const invalidNameResponse = {
  type: 'INVALID_VALUE',
  message: '"name" length must be at least 5 characters long',
};

const notExistingIdResponse = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

const deleteSuccessfulResponse = { type: null };

module.exports = {
  allProductsResponse,
  singleProductResponse,
  invalidProductId,
  invalidIdResponse,
  invalidProductName,
  invalidNameResponse,
  notExistingIdResponse,
  deleteSuccessfulResponse,
  newProductId,
  newProductName,
  newProductBody,
  newProductResponse,
  updatedProductName,
  updatedProductBody,
  updatedProductResponse,
};