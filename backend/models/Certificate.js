import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Issue date is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Certificate image URL is required'],
    },
    verificationUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', CertificateSchema);
export default Certificate;
