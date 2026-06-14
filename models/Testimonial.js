const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    client_name: { type: String, required: true },
    company: { type: String },
    review: { type: String, required: true },
    rating: { type: Number, default: 5 },
    is_approved: { type: Boolean, default: true }
}, { timestamps: true });

testimonialSchema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; } });
module.exports = mongoose.model('Testimonial', testimonialSchema);