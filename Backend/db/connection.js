import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb://127.0.0.1:27017/googleclone'; // Use your correct URI
    await mongoose.connect(uri);
    console.log('MongoDB connected at 6060');
  } catch (error) {
    console.error(' DB Connection Error:', error);
  }
};

export default connectDB;
