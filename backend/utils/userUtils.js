const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const redisClient = require("./redisClient");


/**
 * Hash a password
 * @param {*} password
 * @returns
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Verifies a password
 * @param {*} password
 * @param {*} storedPassword
 * @returns
 */
const verifyPassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
};

/**
 * Generates JWT token
 * @param {*} userId
 * @returns
 */
const generateToken = (userId) => {
//   const token = uuidv4();
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

/**
 * Caches User details in Redis
 * @param {*} token
 * @param {*} User Object
 */
const cacheToken = async (token, user) => {
  const userDetails = {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  await redisClient.setValue(token, JSON.stringify(userDetails));
};

/**
 * Sends Email
 * @param {} options {toEmail, subject, text}
 */
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
    },
    debug: true, // Enable debug mode
    logger: true,
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(message);
};

/**
 * Sets cookie
 * @param {*} response response object
 * @param {*} token Token to set
 * @returns
 */
const storeCookie = (response, token) => {
  return response.cookie("Z-Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 24 * 60 * 60 * 1000, //1day
  });
};

/**
 * Returns User Id or SessionId
 * @param {*} req Request object
 * @returns
 */
const getUserOrSessionId = (req) => (req.user ? req.user._id : req.sessionId);

module.exports = {hashPassword, verifyPassword, cacheToken, generateToken, storeCookie, sendEmail, getUserOrSessionId}