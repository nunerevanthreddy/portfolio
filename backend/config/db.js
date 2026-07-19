import mongoose from 'mongoose';
import User from '../models/User.js';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Check if we need to seed the default admin
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'adminpassword123';
      
      const admin = new User({
        username,
        password, // Pre-save middleware hashes this automatically
      });
      
      await admin.save();
      console.log(`Database seeded with default admin: username='${username}'`);
    }
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    // Do not crash the application in dev if DB fails, but print error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
