const express = require("express");

const {
  protect,
  admin,
  checkSessionId,
} = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrderByOrderId,
  getOrderByUserId,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/create").post(checkSessionId, createOrder);
router.route("/:orderId").get(getOrderByOrderId);
router.route("/user/myorders").get(protect, getOrderByUserId);
router.route("/all").get(protect, admin, getAllOrders);

module.exports = router;
