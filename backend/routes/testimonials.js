import express from 'express';
import Testimonial from '../models/Testimonial.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private
router.post('/', protect, async (req, res, next) => {
  const { name, position, review, rating, image } = req.body;

  if (!name || !review || !rating) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    const testimonial = new Testimonial({
      name,
      position: position || 'Client',
      review,
      rating,
      image,
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json({ success: true, data: createdTestimonial });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial removed successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
