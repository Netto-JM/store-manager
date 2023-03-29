const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const productsMocks = require('./mocks/products.model.mock');

describe('Model unit tests for products', function () {
  describe('Retrieving the list of products', function () {
    it('should retrieve all products', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([productsMocks.allProductsResponse]);
      // Act
      const result = await productsModel.findAll();
      // Assert
      expect(result).to.be.deep.equal(productsMocks.allProductsResponse);
    });
  });

  describe('Retrieving a product by its id', function () {
    it('should retrieve a product by its id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([
        [productsMocks.allProductsResponse[0]]
      ]);
      // Act
      const result = await productsModel.findById(productsMocks.validProductId);
      // Assert
      expect(result).to.be.deep.equal(productsMocks.allProductsResponse[0]);
    });

    it('should return undefined when no product exists with the provided id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[undefined]]);
      // Act
      const result = await productsModel.findById(productsMocks.notExistingProductId);
      // Assert
      expect(result).to.equal(undefined);
    });
  });

  describe('Registering a product', function () {
    it('should register a product', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      // Act
      const result = await productsModel.insert(productsMocks.validProductName);
      // Assert
      expect(result).to.equal(4);
    });
  });

  describe('Updating a product by its id', function () {
    it('should update a product by its id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves();
      // Act
      await productsModel.updateById(productsMocks.validProductId, productsMocks.validProductName);
      // Assert
      expect(connection.execute).to.have.been.calledWith(
        'UPDATE StoreManager.products SET name = ? WHERE id = ?',
        [productsMocks.validProductName, productsMocks.validProductId],
      );
    });
  });

  describe('Deleting a product by its id', function () {
    it('should delete a product by its id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves();
      // Act
      await productsModel.deleteById(productsMocks.validProductId);
      // Assert
      expect(connection.execute).to.have.been.calledWith(
        'DELETE FROM StoreManager.products WHERE id = ?',
        [productsMocks.validProductId],
      );
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});