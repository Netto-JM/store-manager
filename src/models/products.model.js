const connection = require('./connection');

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

const updateById = async (productId, productName) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [productName, productId],
  );
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
  insert,
  deleteById,
  updateById,
};
