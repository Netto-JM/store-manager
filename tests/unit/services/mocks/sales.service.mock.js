const salesModelMocks = require('../../models/mocks/sales.model.mock');

const allSalesResponse = {
  type: null,
  message: salesModelMocks.allSalesResponse,
};

const invalidIdResponse = {
  type: 'INVALID_VALUE',
  message: '"id" must be a number',
};

const notExistingIdResponse = {
  type: 'SALE_NOT_FOUND',
  message: 'Sale not found',
};

const singleSaleResponse = {
  type: null,
  message: salesModelMocks.singleSaleResponse,
};

const deleteSuccessfulResponse = { type: null };

module.exports = {
  allSalesResponse,
  invalidIdResponse,
  notExistingIdResponse,
  singleSaleResponse,
  deleteSuccessfulResponse,
};