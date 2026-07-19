import express from 'express';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';
import Message from '../models/Message.js';
import Testimonial from '../models/Testimonial.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalCertificates = await Certificate.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    
    // Fetch count of unread messages (read is false)
    const unreadMessagesCount = await Message.countDocuments({ read: false });

    // Fetch latest 5 messages for display
    const latestMessages = await Message.find({}).sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: {
          projects: totalProjects,
          certificates: totalCertificates,
          messages: totalMessages,
          unreadMessages: unreadMessagesCount,
          testimonials: totalTestimonials,
        },
        latestMessages,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
