const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../server");
const redisClient = require("../../utils/redisClient");
const DatabaseClient = require("../../config/db");

chai.use(chaiHttp);
const { expect } = chai;

describe("App Routes", () => {
  let request;

  before(() => {
    request = chai.request(app);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return application status", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      sinon.stub(redisClient, "ping").resolves("PONG");

      const res = await request.get("/api/app/status");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.redisActive).to.be.true;
    }
  });

  it("should return application statistics", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const stats = {
        totalNumberOfUsers: 10,
        totalNumberOfProducts: 20,
        totalNumberOfOrders: 30,
      };

      sinon.stub(User, "countDocuments").resolves(stats.totalNumberOfUsers);
      sinon
        .stub(Product, "countDocuments")
        .resolves(stats.totalNumberOfProducts);
      sinon.stub(Order, "countDocuments").resolves(stats.totalNumberOfOrders);

      const res = await request.get("/api/app/stats");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.totalNumberOfUsers).to.equal(stats.totalNumberOfUsers);
      expect(res.body.totalNumberOfProducts).to.equal(
        stats.totalNumberOfProducts
      );
      expect(res.body.totalNumberOfOrders).to.equal(stats.totalNumberOfOrders);
    }
  });
});
