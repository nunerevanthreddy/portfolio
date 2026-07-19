import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    position: {
      type: String,
      default: 'Client / Collaborator',
      trim: true,
    },
    review: {
      type: String,
      required: [true, 'Review content is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;
