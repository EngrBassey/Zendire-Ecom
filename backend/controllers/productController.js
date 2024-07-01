const path = require('path');
const Product = require("../models/productModel");
const upload = require('../utils/productUtils');
const asyncHandler = require("express-async-handler");

class ProductController {
  static getProducts = asyncHandler(async (_request, response) => {
    const products = await Product.find({});
    if (products) {
      return response.status(200).send({
        success: true,
        message: "Products retrieved successfully.",
        result: products,
      });
    } else {
      return response.status(200).send({
        success: true,
        message: "No Product found.",
        result: "",
      });
    }
  });

  static getProductBySKU = asyncHandler(async (request, response) => {
    const sku = request.params.sku;

    if (!sku)
      return response.status(400).send({
        success: false,
        message: "Product SKU is required",
        result: "",
      });
    const product = await Product.findOne({ sku });
    if (!product)
      return response.status(404).send({
        success: false,
        message: "Product does not exist",
        result: "",
      });

    return response.status(200).send({
      success: true,
      message: "Product retrieved successfully",
      result: product,
    });
  });

  static createProduct = [upload.array('images', 5), asyncHandler(async (request, response) => {
    const { name, description, price, sku, numberOfProductsAvailable } =
      request.body;
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!description) missingFields.push('description');
      if (!price) missingFields.push('price');
      if (!sku) missingFields.push('sku');
      if (!numberOfProductsAvailable) missingFields.push('numberOfProductsAvailable');

      if (missingFields.length > 0) {
        return response.status(400).send({
          success: false,
          message: `The following required fields are missing: ${missingFields.join(', ')}`,
          result: "",
        });
      }
        const product = await Product.findOne({sku})
        if (product)
            return response.status(404).send({
              success: false,
              message: `Product with SKU ${sku} already exists.`,
              result: "",
            });
    try {
        const images = request.files.map(file => file.path) || [];
      const newProduct = new Product({
        name,
        description,
        price,
        sku,
        numberOfProductsAvailable,
        images,
      });
      const createProduct = await newProduct.save();
      return response.status(201).send({
        success: true,
        message: "Product created Successfully.",
        result: createProduct,
      });
    } catch (error) {
      console.log("Internal Server Error: ", error);
      return response.status(500).send({
        success: false,
        message: "An error Occurred",
        result: "",
      });
    }
  })
];

  static updateProduct = [upload.array('images', 5), asyncHandler(async (request, response) => {
    const sku = request.params.sku;
    const { name, description, price, numberOfProductsAvailable } =
      request.body;

    if (!sku) {
      return response.status(400).send({
        success: false,
        message: "Product SKU is required",
        result: "",
      });
    }

    try {
      const product = await Product.findOne({ sku });

      if (!product) {
        return response.status(404).send({
          success: false,
          message: "Product not found",
          result: "",
        });
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.numberOfProductsAvailable =
      numberOfProductsAvailable || product.numberOfProductsAvailable;

      if (request.files.length > 0) {
        product.images = request.files.map(file => file.path);
      }

      const updatedProduct = await product.save();

      return response.status(200).send({
        success: true,
        message: "Product updated successfully",
        result: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        success: false,
        message: "Internal Server Error",
        result: "",
      });
    }
  })
];

  static deleteProduct = asyncHandler(async (request, response) => {
    const sku = request.params.sku;

    if (!sku) {
      return response.status(400).send({
        success: false,
        message: "Product SKU is required",
        result: "",
      });
    }

    try {
      const product = await Product.findOne({ sku });

      if (!product) {
        return response.status(404).send({
          success: false,
          message: "Product not found",
          result: "",
        });
      }

      await product.deleteOne();

      return response.status(200).send({
        success: true,
        message: "Product deleted successfully",
        result: "",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        success: false,
        message: "Internal Server Error",
        result: "",
      });
    }
  });
}

module.exports = ProductController;
