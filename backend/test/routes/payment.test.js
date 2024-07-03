const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../server");
const stripe = require("../../config/stripe");
const redisClient = require("../../utils/redisClient");
const Order = require("../../models/orderModel");
const DatabaseClient = require("../../config/db");

chai.use(chaiHttp);
const { expect } = chai;

describe("Payment Routes", () => {
  let request;

  before(() => {
    request = chai.request(app);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should process a payment", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const paymentDetails = {
        amount: 1000,
        currency: "usd",
        paymentMethodId: "pm_123",
        shippingDetails: {
          address: "123 Main St",
          city: "New York",
          postalCode: "10001",
          country: "USA",
        },
      };
      const cart = {
        cartItems: [{ name: "Item 1", price: 100, quantity: 10 }],
      };

      sinon
        .stub(stripe.paymentIntents, "create")
        .resolves({ id: "pi_123", status: "succeeded" });
      sinon.stub(redisClient, "getValue").resolves(JSON.stringify(cart));
      sinon.stub(Order.prototype, "save").resolves(cart);

      const res = await request.post("/api/payment/pay").send(paymentDetails);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });
});
