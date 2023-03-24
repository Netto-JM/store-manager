const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const HTTP_OK_STATUS = 200;
const HTTP_NO_CONTENT_STATUS = 204;

const listSales = async (_req, res) => {
  const { type, message } = await salesService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(HTTP_OK_STATUS).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(HTTP_OK_STATUS).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.sendStatus(HTTP_NO_CONTENT_STATUS);
};

module.exports = {
  listSales,
  getSale,
  deleteSale,
};