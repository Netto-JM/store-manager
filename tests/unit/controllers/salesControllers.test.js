const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { salesService } = require('../../../src/services');

const { salesController } = require('../../../src/controllers');

const salesServiceMocks = require('../services/mocks/sales.service.mock');

describe('Controller unit tests for sales', function () {
  describe('Retrieving the list of sales', function () {
    it('should return status 200 and the list', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({
          type: null,
          message: salesServiceMocks.allSalesResponse
        });

      // act
      await salesController.listSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesServiceMocks.allSalesResponse);
    });
  });
});
