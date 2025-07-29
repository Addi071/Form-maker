import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://khanadnanpathan186:PiIET7MwrbFW77lK@form-maker.zhvmycd.mongodb.net/?retryWrites=true&w=majority&appName=form-maker'; 
    await mongoose.connect(uri);
    console.log('MongoDB connected at 6060');
  } catch (error) {
    console.error(' DB Connection Error:', error);
  }
};

export default connectDB;
