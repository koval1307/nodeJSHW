const {validate} = require("../src/helpers/validate.Middleware")
const sinon = require('sinon')
const Joi = require('joi')

describe("Validation middleware test suite", () => {
  let sandbox = sinon.createSandbox();
  let validationMiddleware;
  let resMock;
  let nextMock;

  before(() => {
    const testSchema = Joi.object({
      email: Joi.string().email().required(),
password: Joi.string().required(),
    });
    validationMiddleware = validate(testSchema);
    resMock = {
      send: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
    };
    nextMock = sandbox.stub();
  });

  after(() => {
    sandbox.restore();
  });

  context("when req body is valid", () => {
    const reqMock = { body: { email: "hello@mail.com", password: "dada" } };

    before(() => {
      validationMiddleware(reqMock, resMock, nextMock);
    });

    after(() => {
      sandbox.resetHistory();
    });

    it("should not call res.status", () => {
      sinon.assert.notCalled(resMock.status);
    });

    it("should not call res.send", () => {
      sinon.assert.notCalled(resMock.send);
    });

    it("should call next once", () => {
      sinon.assert.calledOnce(nextMock);
      sinon.assert.calledWithExactly(nextMock);
    });
  });

  context("when req body is not valid", () => {
    const reqMock = { body: {} };

    before(() => {
      validationMiddleware(reqMock, resMock, nextMock);
    });

    after(() => {
      sandbox.resetHistory();
    });

    it("should call res.status once", () => {
      sinon.assert.calledOnce(resMock.status);
      sinon.assert.calledWithExactly(resMock.status, 400);
    });

    it("should call res.send once", () => {
      sinon.assert.calledOnce(resMock.send);
    });

    it("should not call next", () => {
      sinon.assert.notCalled(nextMock);
    });
  });
});