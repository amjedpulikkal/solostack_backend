import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_url: string = process.env.db

export async function dbConnect() {
    try {
        const options: ConnectOptions = {
            dbName: "solostack",
            writeConcern: {
                w: 'majority',
                wtimeoutMS: 5000  
            }
        };

        const data = await mongoose.connect(db_url, options);
        console.log(`Connected to MongoDB Atlas at ${data.connection.host}`);
    } catch (error: any) {
        console.error('Failed to connect to MongoDB Atlas:', error);
        setTimeout(dbConnect, 5000); 
    }
}

