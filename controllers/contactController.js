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
        const id = req.params.id;
        
        // 1. Check karein ki id aayi bhi hai ya nahi (ya 'undefined' toh nahi aayi)
        if (!id || id === 'undefined') {
            return res.status(400).json({ error: 'Valid ID nahi mili. Frontend code check karein.' });
        }

        // 2. Delete operation
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ error: 'Message database mein nahi mila.' });
        }

        res.json({ message: 'Contact deleted successfully' });
    } catch (err) { 
        console.error("Backend Delete Error:", err.message);
        res.status(500).json({ error: err.message }); 
    }
};