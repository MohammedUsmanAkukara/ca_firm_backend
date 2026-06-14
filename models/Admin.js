const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    reset_token: { type: String, default: null },
    reset_token_expiry: { type: Date, default: null }
}, { timestamps: true });

adminSchema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; } });
module.exports = mongoose.model('Admin', adminSchema);