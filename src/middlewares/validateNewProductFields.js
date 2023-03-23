const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: '"name" is required',
    });
  }

  return next();
};