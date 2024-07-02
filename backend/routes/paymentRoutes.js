const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();


router.route("/pay").post(paymentController.pay);

module.exports = router;
