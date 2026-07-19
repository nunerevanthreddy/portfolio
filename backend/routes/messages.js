import express from 'express';
import Message from '../models/Message.js';
import protect from '../middleware/auth.js';
import sendEmailNotification from '../config/nodemailer.js';

const router = express.Router();

// @desc    Submit a contact message
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  // Basic email syntax regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      phone,
      subject,
      message,
    });

    const savedMessage = await newMessage.save();

    // Trigger email dispatch in the background (non-blocking)
    sendEmailNotification({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully!',
      data: savedMessage,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message removed successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
