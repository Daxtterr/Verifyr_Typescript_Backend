import mongoose from "mongoose";
async function connectDB(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
