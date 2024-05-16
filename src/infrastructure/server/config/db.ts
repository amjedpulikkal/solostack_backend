import mongoose from "mongoose";
require("dotenv").config();

const db_url: string = process.env.db || ""

export async function dbConnect() {
    try {
        const data = await mongoose.connect(db_url)
        console.log(data.connection.host)
    } catch (error: any) {
        console.log(error)
        
        setTimeout(dbConnect,5000)
    }

}
