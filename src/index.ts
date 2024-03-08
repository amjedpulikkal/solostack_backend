require("dotenv").config();
import app from "./infrastructure/server/config/app";
import { dbConnect } from "./infrastructure/server/config/db";
const port:string|number = process.env.PORT || 3001


app.listen(port,()=>{
    dbConnect()
    console.log("start",port)
})