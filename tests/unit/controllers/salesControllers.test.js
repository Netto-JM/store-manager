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
        .resolves(salesServiceMocks.allSalesResponse);

      // act
      await salesController.listSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesServiceMocks.allSalesResponse.message);
    });
  });

  describe('Retrieving a single sale', function () {
    it('should return status 200 and the sale', async function () {
      // arrange
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves(salesServiceMocks.singleSaleResponse);

      // act
      await salesController.getSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesServiceMocks.singleSaleResponse.message);
    });

    it('should return an error if an invalid id is passed', async function () {
      // arrange
      const res = {};
      const req = {
        params: {
          id: 'abc',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves(salesServiceMocks.invalidIdResponse);

      // act
      await salesController.getSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: salesServiceMocks.invalidIdResponse.message });
    });

    it('should return an error if a nonexistent id is passed', async function () {
      // arrange
      const res = {};
      const req = {
        params: {
          id: 999,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves(salesServiceMocks.notExistingIdResponse);

      // act
      await salesController.getSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: salesServiceMocks.notExistingIdResponse.message });
    });
  });

  describe('Deleting a single sale', function () {
    it('should return status 204', async function () {
      // arrange
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };

      res.sendStatus = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteById')
        .resolves(salesServiceMocks.deleteSuccessfulResponse);

      // act
      await salesController.deleteSale(req, res);

      // assert
      expect(res.sendStatus).to.have.been.calledWith(204);
    });

    it('should return an error if an invalid id is passed', async function () {
      // arrange
      const res = {};
      const req = {
        params: {
          id: 'abc',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteById')
        .resolves(salesServiceMocks.invalidIdResponse);

      // act
      await salesController.deleteSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: salesServiceMocks.invalidIdResponse.message });
    });

    it('should return an error if a nonexistent id is passed', async function () {
      // arrange
      const res = {};
      const req = {
        params: {
          id: 999,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteById')
        .resolves(salesServiceMocks.notExistingIdResponse);

      // act
      await salesController.deleteSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: salesServiceMocks.notExistingIdResponse.message });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
