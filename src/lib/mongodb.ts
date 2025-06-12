import mongoose from 'mongoose';

// Example connection code:
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export default connectToDatabase;
