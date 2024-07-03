const express = require("express");

const {
  protect,
  admin,
  setUser,
} = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrderByOrderId,
  getOrderByUserId,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/create").post(setUser, createOrder);
router.route("/:orderId").get(getOrderByOrderId);
router.route("/user/myorders").get(protect, getOrderByUserId);
router.route("/all").get(admin, getAllOrders);

module.exports = router;
