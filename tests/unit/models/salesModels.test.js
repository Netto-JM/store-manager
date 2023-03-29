const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const salesMocks = require('./mocks/sales.model.mock');

describe('Model unit tests for sales', function () {
  describe('Retrieving the list of sales', function () {
    it('should retrieve all sales', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([salesMocks.allSalesMock]);
      // Act
      const result = await salesModel.findAll();
      // Assert
      expect(result).to.be.deep.equal(salesMocks.allSalesResponse);
    });
  });

  describe('Retrieving a sale by its id', function () {
    it('should return undefined when no sale exists with the provided id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[]]);
      // Act
      const result = await salesModel.findById(999);
      // Assert
      expect(result).to.equal(undefined);
    });
    
    it('should retrieve a sale by its id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([salesMocks.singleSaleMock]);
      // Act
      const result = await salesModel.findById(1);
      // Assert
      expect(result).to.be.deep.equal(salesMocks.singleSaleResponse);
    });
  });

  describe('Deleting a sale by its id', function () {
    it('should delete a sale by its id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves();
      // Act
      await salesModel.deleteById(1);
      // Assert
      expect(connection.execute).to.have.been.calledWith(
        'DELETE FROM StoreManager.sales WHERE id = ?',
        [1],
      );
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});