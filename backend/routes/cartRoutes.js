const express = require("express");
const cartController = require("../controllers/cartController");
const { setUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/add").post(setUser, cartController.addToCart);
router.route("/").get(setUser, cartController.getCart);
router
  .route("/remove/:productId")
  .delete(setUser, cartController.removeFromCart);

module.exports = router;
