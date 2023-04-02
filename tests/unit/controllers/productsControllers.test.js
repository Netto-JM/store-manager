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
        .resolves(productsServiceMocks.allProductsResponse);

      // act
      await productsController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsServiceMocks.allProductsResponse.message);
    });
  });

  describe('Retrieving a single product', function () {
    it('should return status 200 and the product', async function () {
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
        .stub(productsService, 'findById')
        .resolves(productsServiceMocks.singleProductResponse);

      // act
      await productsController.getProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsServiceMocks.singleProductResponse.message);
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
        .stub(productsService, 'findById')
        .resolves(productsServiceMocks.invalidIdResponse);

      // act
      await productsController.getProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.invalidIdResponse.message });
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
        .stub(productsService, 'findById')
        .resolves(productsServiceMocks.notExistingIdResponse);

      // act
      await productsController.getProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.notExistingIdResponse.message });
    });
  });

  describe('Deleting a single product', function () {
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
        .stub(productsService, 'deleteById')
        .resolves(productsServiceMocks.deleteSuccessfulResponse);

      // act
      await productsController.deleteProduct(req, res);

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
        .stub(productsService, 'deleteById')
        .resolves(productsServiceMocks.invalidIdResponse);

      // act
      await productsController.deleteProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.invalidIdResponse.message });
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
        .stub(productsService, 'deleteById')
        .resolves(productsServiceMocks.notExistingIdResponse);

      // act
      await productsController.deleteProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.notExistingIdResponse.message });
    });
  });

  describe('Creating a single product', function () {
    it('should return status 201 and the newly created product', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: productsServiceMocks.newProductName,
        },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves(productsServiceMocks.newProductResponse);

      // act
      await productsController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productsServiceMocks.newProductResponse.message);
    });

    it('should return an error if an invalid name is passed', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: 'foo',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves(productsServiceMocks.invalidNameResponse);

      // act
      await productsController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.invalidNameResponse.message });
    });
  });

  describe('Updating a single product', function () {
    it('should return status 200 and the updated product', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: productsServiceMocks.updatedProductName,
        },
        params: {
          id: 1,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves(productsServiceMocks.updatedProductResponse);

      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsServiceMocks.updatedProductResponse.message);
    });

    it('should return an error if an invalid name is passed', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: 'foo',
        },
        params: {
          id: 1,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves(productsServiceMocks.invalidNameResponse);

      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.invalidNameResponse.message });
    });

    it('should return an error if an invalid id is passed', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: productsServiceMocks.updatedProductName,
        },
        params: {
          id: 'abc',
        },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves(productsServiceMocks.invalidIdResponse);

      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.invalidIdResponse.message });
    });

    it('should return an error if a nonexistent id is passed', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: productsServiceMocks.updatedProductName,
        },
        params: {
          id: 999,
        },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves(productsServiceMocks.notExistingIdResponse);

      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: productsServiceMocks.notExistingIdResponse.message });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
