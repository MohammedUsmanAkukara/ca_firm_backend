const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const serviceController = require('../controllers/serviceController');
const contactController = require('../controllers/contactController');
const testimonialController = require('../controllers/testimonialController'); // Import Testimonial Controller


// Middleware for all admin routes
router.use(authenticateJWT);

// --- SERVICES ROUTES ---
router.post('/services', serviceController.createService);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

// --- CONTACTS ROUTES ---
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id/read', contactController.markAsRead);
router.delete('/contacts/:id', contactController.deleteContacts);

// --- TESTIMONIALS ROUTES --- (Ye naya part hai)
router.get('/testimonials', testimonialController.getAdminTestimonials);
router.post('/testimonials', testimonialController.createTestimonial);
router.put('/testimonials/:id', testimonialController.updateTestimonial);
router.delete('/testimonials/:id', testimonialController.deleteTestimonial);

module.exports = router;