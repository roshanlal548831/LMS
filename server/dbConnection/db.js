import  mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;

const connectDb = async() => {
    try {
        if (!uri) {
            throw new Error('MongoDB connection URI is missing.');
          };
       await mongoose.connect(uri);
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.log("mongodb error =>" ,error)
        
    }
};

export default connectDb