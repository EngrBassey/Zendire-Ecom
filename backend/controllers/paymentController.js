const stripe = require("../config/stripe");
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");

/**
 * Handles Payment functionalities
 */
class PaymentController {
  /**
   * Creates dummy card for checkout using Stripe
   * @param {*} _request
   * @param {*} response
   * @returns
   */
  createPayment = asyncHandler(async (_request, response) => {
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: "4242424242424242",
          exp_month: 12,
          exp_year: 2025,
          cvc: "123",
        },
      });

      return response.status(201).send({
        success: true,
        message: "Payment method created successfully",
        result: paymentMethod,
      });
    } catch (err) {
      console.error("Error creating payment method:", err);
      return response.status(500).send({
        success: false,
        message: "Internal Server Error",
        result: "",
      });
    }
  });

  /**
   * Confirms payment and stores order to db
   * @param {*} _request
   * @param {*} response
   * @returns
   */
  pay = asyncHandler(async (request, response) => {
    try {
      const {
        amount,
        currency = "usd",
        paymentMethodId,
        shippingDetails,
      } = request.body;

      const userOrSessionId = getUserOrSessionId(request);
      const id = `order:${userOrSessionId}`;

      if (!amount || !paymentMethodId || !shippingDetails) {
        return response.status(400).send({
          success: false,
          message: "Amount, Payment ID, and Shipping Details are required",
          result: "",
        });
      }
      const paymentIntent = await stripe.charges.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        confirm: true,
      });

      let cart = await redisClient.getValue(id);

      if (!cart || cart.cartItems.length < 0) {
        return response.status(400).send({
          success: false,
          message: "Cart is empty",
          result: "",
        });
      }
      cart = JSON.parse(cart);
      const orderItems = cart.cartItems.map((item) => ({
        name: item.name,
        product: item.product,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));
      const totalPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      const shippingAddress = {
        address: shippingDetails.address,
        city: shippingDetails.city,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      };
      const orderData = {
        user: userOrSessionId,
        orderItems,
        shippingAddress,
        paymentMethod: "card",
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentInfo: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
      };

      let createdOrder;
      if (request.user) {
        // Authenticated user, save order to db
        const order = new Order(orderData);
        createdOrder = await order.save();
      } else {
        // Unauthenticated user, save order to Redis
        const orderId = `order:${uuidv4()}`;
        await redisClient.setValue(
          orderId,
          JSON.stringify(orderData),
          24 * 3600
        );
        createdOrder = orderData;
      }

      return response.status(201).send({
        success: true,
        message: "Payment processed successfully",
        result: createdOrder,
      });

    } catch (error) {
      console.error("Error processing payment:", error);
      return response.status(500).send({
        success: false,
        message: "Internal Server Error",
        result: "",
      });
    }
  });
}

module.exports = new PaymentController();
