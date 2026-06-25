import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4  // Force IPv4 — often fixes DNS issues
});
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;