const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const redisClient = require("../utils/redisClient");

/**
 * Defines Auth Middleware
 * - Ensures that only authenticated users are allowed
 */
const protect = asyncHandler(async (request, response, next) => {
  const token = request.cookies["Z-Token"];

  if (token) {
    const userDetails = await redisClient.getValue(token);
    if (!userDetails) {
      response.status(401);
      return response.json({ message: "Unauthorized. Invalid token" });
    } else {
        request.user = JSON.stringify(userDetails);
      next();
    }
  } else {
    response.status(401);
    return response.json({
      success: false,
      message: "Unauthorized. You are not logged in ",
      result: "",
    });
  }
});

/**
 * Defines Admin Middleware
 * - Ensures that only Admin users are allowed.
 */
const admin = (request, response, next) => {
  if (request.user && request.user.isAdmin) {
    next();
  } else {
    response.status(403);
    response.json({
      success: false,
      message: "Access Forbidden. You are not an Admin",
      result: "",
    });
  }
};

/**
 * Handles Session id for unauthenticated users;
 * @param {} request
 * @param {*} response
 * @param {*} next
 */
const checkSessionId = (request, response, next) => {
  if (!request.user) {
    if (!request.cookies["session-id"]) {
      const sessionId = uuidv4();
      response.cookie("session-id", sessionId, {
        httpOnly: true,
        maxAge: 24 * 3600 * 1000, // 1day
      });
      request.sessionId = sessionId;
    } else {
      request.sessionId = request.cookies["session-id"];
    }
  }
  next();
};

module.exports = { protect, admin, checkSessionId };
