const { CrudServer } = require('../src/server')
const { UserModel } = require("../src/users/users.model");
const bcryptjs = require("bcryptjs");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");

describe(" LogIn test suite", () => {
  let app;

  before(async () => {
    const crudServer = new CrudServer();
    await crudServer.startForTests()
    app = crudServer.app;
  });

  context("when everything ok", () => {
    let user;
    let pass;
    let response;

    before(async () => {
        pass = "qwerty";
        console.log(UserModel)
      user = await UserModel.create({
        email: "test@email.com",
        password: await bcryptjs.hash(password, 5),
      });

      response = await request(app).post("/auth/login").send({
        email: user.email,
        password: password,
      });
    });

    after(async () => {
      await UserModel.deleteOne({ _id: user._id });
    });

    it("should return 200 OK", () => {
      expect(response.status).to.be.equal(200);
    });

    it("should add token to user document", async () => {
      const updatedUser = await UserModel.findById(user._id);
      const [token] = updatedUser.tokens;
      expect(token).to.exist;
    });

    it("should return expected response body", () => {
      expect(response.body).to.exist;
      expect(response.body.user).to.deep.equal({
        id: user._id.toString(),
        email: user.email,
      });
      expect(typeof response.body.token).to.equal("string");
    });

    it("should return valid jwt token", () => {
      const payload = jwt.decode(response.body.token);
      expect(payload.userId).to.equal(user._id.toString());
    });
  });
});