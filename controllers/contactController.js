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
        const contactId = req.params.id;

        const deletedContact = await Contact.findByIdAndDelete(contactId);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error("Error deleting contact:", err);
        res.status(500).json({ message: "Server error while deleting message" });
    }
};