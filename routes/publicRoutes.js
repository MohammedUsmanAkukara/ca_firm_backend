const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const testimonialController = require('../controllers/testimonialController');
const contactController = require('../controllers/contactController');

router.get('/services', serviceController.getPublicServices);
router.get('/testimonials', testimonialController.getPublicTestimonials);
router.post('/contact', contactController.submitContact);

module.exports = router;