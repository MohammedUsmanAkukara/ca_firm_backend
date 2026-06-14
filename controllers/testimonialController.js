const Testimonial = require('../models/Testimonial');

exports.getPublicTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ is_approved: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAdminTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json({ message: 'Testimonial added', id: testimonial._id });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Testimonial updated' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};