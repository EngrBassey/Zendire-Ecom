const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Initializes Admin/Store Owner
 */
const initializeAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminExists = User.findOne({ email: adminEmail });

        if (!adminExists) {
            const admin = new User({
                username: 'Admin',
                email: process.env.ADMIN_EMAIL,
                isAdmin: true,
            });
            await admin.save();
        }
        console.log('Admin Account is ready');
    } catch (err) {
        console.error('An error occurred:', err.message)
    };
}

module.exports = initializeAdmin;
