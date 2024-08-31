import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDB;
