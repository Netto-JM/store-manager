const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { salesModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');

const salesServiceMocks = require('./mocks/sales.service.mock');
const salesModelMocks = require('../models/mocks/sales.model.mock')

describe('Service unit tests for sales', function () {
  describe('Retrieving the list of sales', function () {
    it('should retrieve all sales', async function () {
      // Arrange
      sinon.stub(salesModel, 'findAll').resolves(salesModelMocks.allSalesResponse);
      // Act
      const result = await salesService.findAll();
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.allSalesResponse);
    });
  });

  describe('Retrieving a sale by its id', function () {
    it('should return an error when an invalid sale id is provided', async function () {
      // No arrange
      // Act
      const result = await salesService.findById('invalidId');
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.invalidIdResponse);
    });

    it('should return an error when no sale exists with the provided id', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves(undefined);
      // Act
      const result = await salesService.findById(999);
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.notExistingIdResponse);
    });

    it('should retrieve a sale by its id', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves(salesModelMocks.singleSaleResponse);
      // Act
      const result = await salesService.findById(1);
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.singleSaleResponse);
    });
  });

  describe('Deleting a sale by its id', function () {
    it('should return an error when an invalid sale id is provided', async function () {
      // No arrange
      // Act
      const result = await salesService.deleteById('invalidId');
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.invalidIdResponse);
    });

    it('should return an error when no sale exists with the provided id', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves(undefined);
      // Act
      const result = await salesService.deleteById(999);
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.notExistingIdResponse);
    });

    it('should delete a sale by its id', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves(salesModelMocks.singleSaleResponse);
      sinon.stub(salesModel, 'deleteById').resolves();
      // Act
      const result = await salesService.deleteById(1);
      // Assert
      expect(result).to.be.deep.equal(salesServiceMocks.deleteSuccessfulResponse);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});