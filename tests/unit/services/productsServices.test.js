const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');

const productsServiceMocks = require('./mocks/products.service.mock');
const productsModelMocks = require('../models/mocks/products.model.mock')

describe('Service unit tests for products', function () {
  describe('Retrieving the list of products', function () {
    it('should retrieve all products', async function () {
      // Arrange
      sinon.stub(productsModel, 'findAll').resolves(productsModelMocks.allProductsResponse);
      // Act
      const result = await productsService.findAll();
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.allProductsResponse);
    });
  });

  describe('Retrieving a product by its id', function () {
    it('should retrieve a product by its id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(productsModelMocks.allProductsResponse[0]);
      // Act
      const result = await productsService.findById(productsModelMocks.validProductId);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.singleProductResponse);
    });

    it('should return an error when an invalid product id is provided', async function () {
      // No arrange
      // Act
      const result = await productsService.findById(productsServiceMocks.invalidProductId);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.invalidIdResponse);
    });

    it('should return an error when no product exists with the provided id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
      // Act
      const result = await productsService.findById(productsModelMocks.notExistingProductId);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.notExistingIdResponse);
    });
  });

  describe('Registering a product', function () {
    it('should register a product', async function () {
      // Arrange
      sinon.stub(productsModel, 'insert').resolves(productsServiceMocks.newProductId);
      sinon.stub(productsModel, 'findById').resolves(productsServiceMocks.newProductBody);
      // Act
      const result = await productsService.createProduct(productsServiceMocks.newProductName);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.newProductResponse);
    });

    it('should return an error when an invalid product name is provided', async function () {
      // No arrange
      // Act
      const result = await productsService.createProduct(productsServiceMocks.invalidProductName);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.invalidNameResponse);
    });
  });

  describe('Updating a product by its id', function () {
    it('should return an error when an invalid product id is provided', async function () {
      // No arrange
      // Act
      const result = await productsService.updateById(productsServiceMocks.invalidProductId, 'foo');
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.invalidIdResponse);
    });

    it('should return an error when an invalid product name is provided', async function () {
      // No arrange
      // Act
      const result = await productsService.updateById(1, productsServiceMocks.invalidProductName);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.invalidNameResponse);
    });

    it('should return an error when no product exists with the provided id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
      // Act
      const result = await productsService
        .updateById(productsModelMocks.notExistingProductId, productsModelMocks.validProductName);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.notExistingIdResponse);
    });
    
    it('should update a product by its id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById')
        .onFirstCall()
        .resolves(productsModelMocks.allProductsResponse[0])
        .onSecondCall()
        .resolves(productsServiceMocks.updatedProductBody);
      sinon.stub(productsModel, 'updateById').resolves();
      // Act
      const result = await productsService
        .updateById(productsModelMocks.validProductId, productsServiceMocks.updatedProductName);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.updatedProductResponse);
      expect(productsModel.findById).to.be.calledTwice;
    });
  });

  describe('Deleting a product by its id', function () {
    it('should delete a product by its id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(productsModelMocks.allProductsResponse[0]);
      sinon.stub(productsModel, 'deleteById').resolves();
      // Act
      const result = await productsService.deleteById(productsModelMocks.validProductId);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.deleteSuccessfulResponse);
    });

    it('should return an error when an invalid product id is provided', async function () {
      // No arrange
      // Act
      const result = await productsService.deleteById(productsServiceMocks.invalidProductId);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.invalidIdResponse);
    });

    it('should return an error when no product exists with the provided id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
      // Act
      const result = await productsService.deleteById(productsModelMocks.notExistingProductId);
      // Assert
      expect(result).to.be.deep.equal(productsServiceMocks.notExistingIdResponse);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});