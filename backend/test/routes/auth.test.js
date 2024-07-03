const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../server");
const User = require("../../models/userModel");
const DatabaseClient = require("../../config/db");

chai.use(chaiHttp);
const { expect } = chai;

describe("Auth Routes", () => {
  let request;

  before(() => {
    request = chai.request(app);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should register a new user", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const user = {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      };
      sinon.stub(User.prototype, "save").resolves(user);

      const res = await request.post("/api/auth/register").send(user);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should log in a user", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const user = { email: "test@example.com", password: "password" };
      sinon
        .stub(User, "findOne")
        .resolves({ ...user, comparePassword: sinon.stub().returns(true) });

      const res = await request.post("/api/auth/login").send(user);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should send a password reset email", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      sinon.stub(User, "findOne").resolves({ email: "test@example.com" });

      const res = await request
        .post("/api/user/forgot-password")
        .send({ email: "test@example.com" });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should reset the password", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const user = {
        resetPasswordToken: "token",
        resetPasswordExpire: Date.now() + 3600000,
        save: sinon.stub(),
      };
      sinon.stub(User, "findOne").resolves(user);

      const res = await request
        .post("/api/user/reset-password/token")
        .send({ password: "newpassword" });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });
});
