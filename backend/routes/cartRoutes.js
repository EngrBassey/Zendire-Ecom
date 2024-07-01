const express = require("express");
const cartController = require("../controllers/cartController");
const { checkSessionId } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/add").post(checkSessionId, cartController.addToCart);
router.route("/").get(checkSessionId, cartController.getCart);
router
  .route("/remove/:productId")
  .delete(checkSessionId, cartController.removeFromCart);

module.exports = router;
