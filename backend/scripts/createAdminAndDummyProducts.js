const User = require('../models/userModel');
const dotenv = require('dotenv');
const Product = require('../models/productModel');
const DatabaseClient = require('../config/db');
const { hashPassword, generateToken, cacheToken, storeCookie } = require('../utils/userUtils');

dotenv.config();

/**
 * Initializes Admin Owner
 */
const initializeAdmin = async () => {
    try {
        console.log('Creating Admin User .......')
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            const hashedPassword = await hashPassword(adminPassword);
            const admin = new User({
                username: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true,
            });
            await admin.save();
            console.log('Admin Account created successfully');
        } else {
            console.log('Admin Account already exists');
        }

        // Log in the admin user
        const adminUser = await User.findOne({ email: adminEmail });
        const token = generateToken(adminUser._id);
        cacheToken(token, adminUser);

        console.log('Admin user logged in successfully');
        console.log('Token:', token);
    } catch (err) {
        console.error('An error occurred:', err.message);
    }
};

/**
 * Initializes Dummy Products
 */
const initializeProducts = async () => {
    try {
        console.log('Creating dummy Products.......')
        const products = [
            {
                name: 'Sample Product 1',
                description: 'This is a sample product',
                price: 29.99,
                sku: 'SP001',
                numberOfProductsAvailable: 100,
                images: [
                    'https://via.placeholder.com/150',
                    'https://via.placeholder.com/200'
                ]
            },
            {
                name: 'Sample Product 2',
                description: 'This is another sample product',
                price: 39.99,
                sku: 'SP002',
                numberOfProductsAvailable: 50,
                images: [
                    'https://via.placeholder.com/150',
                    'https://via.placeholder.com/200'
                ]
            }
        ];

        await Product(products);
        console.log('Dummy products created successfully');
    } catch (err) {
        console.error('An error occurred:', err.message);
    }
};


const runScripts = async () => {
    await initializeAdmin();
    await initializeProducts();
    console.log('All done')
    process.exit(0);
};

runScripts();

