const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const transporter = require('../utils/email');
const Admin = require('../models/Admin.js'); // Mongoose Model

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, admin.password_hash);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ token, message: 'Login successful' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ error: 'Email not found' });

        const token = crypto.randomBytes(32).toString('hex');
        const expiry = Date.now() + 3600000; // 1 hour

        admin.reset_token = token;
        admin.reset_token_expiry = expiry;
        await admin.save();

        const resetLink = `${process.env.CLIENT_URL}/admin/reset-password?token=${token}`;
        
        await transporter.sendMail({
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
        });

        res.json({ message: 'Password reset link sent to your email' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const admin = await Admin.findOne({ 
            reset_token: token, 
            reset_token_expiry: { $gt: Date.now() } 
        });

        if (!admin) return res.status(400).json({ error: 'Invalid or expired reset token' });

        admin.password_hash = await bcrypt.hash(newPassword, 10);
        admin.reset_token = null;
        admin.reset_token_expiry = null;
        await admin.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};