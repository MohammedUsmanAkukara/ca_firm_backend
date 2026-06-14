const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon_name: { type: String, default: 'Briefcase' },
    is_active: { type: Boolean, default: true }
}, { timestamps: true });

serviceSchema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; } });
module.exports = mongoose.model('Service', serviceSchema);