const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const DatabaseClient = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const setupSwagger = require('./config/swagger');



dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use('/api/product', productRoutes);


setupSwagger(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
