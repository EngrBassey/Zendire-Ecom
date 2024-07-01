const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();


router.route("/create-payment").post(paymentController.createPayment);
router.route("/pay").post(paymentController.pay);

module.exports = router;
