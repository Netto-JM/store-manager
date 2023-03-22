const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const HTTP_OK_STATUS = 200;

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json({message});

  res.status(HTTP_OK_STATUS).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({message});

  res.status(HTTP_OK_STATUS).json(message);
};

module.exports = {
  listProducts,
  getProducts,
};