const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DatabaseClient = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");



const setupSwagger = require("./config/swagger");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/product", productRoutes);

const userRoutes = require("./routes/userRoutes");
const appRoutes = require("./routes/appRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/user", userRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/app", appRoutes);

app.use("/api/payment", paymentRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
