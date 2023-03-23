const { idSchema, productNameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = productNameSchema.validate(name);
  if (error) return { type: 'INVALID_VALUE', message: '"name" must be in a valid format' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};