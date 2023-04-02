const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { productsService } = require('../../../src/services');

const { productsController } = require('../../../src/controllers');

const productsServiceMocks = require('../services/mocks/products.service.mock');

describe('Controller unit tests for products', function () {
  describe('Retrieving the list of products', function () {
    it('should return status 200 and the list', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({
          type: null,
          message: productsServiceMocks.allProductsResponse
        });

      // act
      await productsController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsServiceMocks.allProductsResponse);
    });
  });
});
