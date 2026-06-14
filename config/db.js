const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4 // Ye forcefully IPv4 use karega
        });
        console.log('MongoDB Connected Successfully');

        // Seed Default Admin (Agar DB khali hai)
        const Admin = require('../models/Admin.js');
        const adminExists = await Admin.findOne({ email: 'admin@cafirm.com' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('hb1t7bbknj', 10);
            await Admin.create({
                email: 'admin@cafirm.com',
                password_hash: hashedPassword
            });
            console.log('Default Admin Created: admin@cafirm.com / hb1t7bbknj');
        }
    } catch (error) {
        console.log('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;