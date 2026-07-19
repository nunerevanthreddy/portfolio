import express from 'express';
import Certificate from '../models/Certificate.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private
router.post('/', protect, async (req, res, next) => {
  const { title, issuer, date, image, verificationUrl } = req.body;

  if (!title || !issuer || !date || !image) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    const certificate = new Certificate({
      title,
      issuer,
      date,
      image,
      verificationUrl,
    });

    const createdCertificate = await certificate.save();
    res.status(201).json({ success: true, data: createdCertificate });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Certificate removed successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
