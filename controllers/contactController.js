const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
    try {
        await Contact.create(req.body);
        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.markAsRead = async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, { is_read: true });
        res.json({ message: 'Marked as read' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteContacts = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};