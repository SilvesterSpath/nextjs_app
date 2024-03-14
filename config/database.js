import mongoose from 'mongoose';

let connected = false;

// async because mongoose is async and returns a promise
const connectDB = async () => {
  // only the fields in the schema will be saved
  mongoose.set('strictQuery', true);

  // If the database is already connected, don't connect again (because we use next.js's api)
  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }
};

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URI);
  connected = true;
  console.log('MonogDB connected...');
} catch (error) {
  console.log(error);
}

export default connectDB;
