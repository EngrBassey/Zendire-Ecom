const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../server");
const Product = require("../../models/productModel");
const DatabaseClient = require("../../config/db");

chai.use(chaiHttp);
const { expect } = chai;

describe("Product Routes", () => {
  let request;

  before(() => {
    request = chai.request(app);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a new product", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const productData = {
        name: "Test Product",
        sku: "TEST123",
        price: 99.99,
        description: "Testing product creation",
        images: ["shirts.jpg"],
      };

      sinon.stub(Product.prototype, "save").resolves(productData);

      const res = await request.post("/api/products/new").send(productData);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should update a product", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const updatedProductData = {
        name: "Updated Product",
        price: 129.99,
        description: "Updated description",
        images: ["shirts1.jpg"],
      };

      sinon.stub(Product, "findOneAndUpdate").resolves(updatedProductData);

      const res = await request
        .put("/api/products/update/TEST123")
        .send(updatedProductData);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should delete a product", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      sinon.stub(Product, "findOneAndDelete").resolves({});

      const res = await request.delete("/api/products/delete/TEST123");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should get a product by SKU", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const productData = {
        name: "Shirts",
        sku: "TEST123",
        price: 99.99,
        description: "Testing product creation",
        images: ["shirts1.jpg"],
      };

      sinon.stub(Product, "findOne").resolves(productData);

      const res = await request.get("/api/products/TEST123");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
    }
  });

  it("should get all products", async () => {
    if (await DatabaseClient.connectToDatabase()) {
      const productList = [
        {
          name: "Product 1",
          sku: "P123",
          price: 49.99,
          description: "Product 1 description",
          images: ["watch1.jpg"],
        },
        {
          name: "Product 2",
          sku: "P456",
          price: 69.99,
          description: "Product 2 description",
          images: ["image2.jpg"],
        },
      ];

      sinon.stub(Product, "find").resolves(productList);

      const res = await request.get("/api/products");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.success).to.be.true;
      expect(res.body.data).to.deep.equal(productList);
    }
  });
});
