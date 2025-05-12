import mongoose from "mongoose";

const uri = "mongodb+srv://2020ce40f:lkKsi2jXkRReZGzl@olms.hoe1ctv.mongodb.net/?retryWrites=true&w=majority&appName=olms";

const connectDB = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected ");
    } catch (error) {
      console.error(" MongoDB connection error:", error);
      process.exit(1); 
    }
  };
  
  export default connectDB;