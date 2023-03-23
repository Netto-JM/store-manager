const camelize = require('camelize');
const connection = require('./connection');

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const deleteById = async (productId) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
};

module.exports = {
  findById,
  findAll,
  deleteById,
};
