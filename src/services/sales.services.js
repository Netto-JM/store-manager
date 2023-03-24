const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModel.findById(saleId);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const deleteById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModel.findById(saleId);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  salesModel.deleteById(saleId);

  return { type: null };
};

module.exports = {
  findAll,
  findById,
  deleteById,
};