const camelize = require('camelize');
const connection = require('./connection');

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`,
    [saleId],
  );
  if (result.length) return camelize(result);
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id`,
  );
  console.log('findAll', result);
  return camelize(result);
};

const deleteById = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
};

module.exports = {
  findById,
  findAll,
  deleteById,
};
