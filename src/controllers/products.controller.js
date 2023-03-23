const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(HTTP_OK_STATUS).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(HTTP_OK_STATUS).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.sendStatus(HTTP_NO_CONTENT_STATUS);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await productsService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(HTTP_CREATED_STATUS).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  deleteProduct,
  createProduct,
};