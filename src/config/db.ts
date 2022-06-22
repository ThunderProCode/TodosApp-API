import mongoose from "mongoose";

let database: string
if (process.env.MONGO_URI) {
  database = process.env.MONGO_URI
} else {
  throw new Error("MONGO_URI environment variable is not set")
}

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(database);
        conn.connection.host;
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}