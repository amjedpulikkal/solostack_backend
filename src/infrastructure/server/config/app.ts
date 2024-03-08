require("dotenv").config();

import express, { Express} from "express";
import cors  from "cors"
import helmet from "helmet";
import morgan from "morgan"
import StudentRouter from "../router/studentRouter"
const app:Express = express()

app.use(cors({origin:process.env.CLIENT_SERVER,credentials:true}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/api/v1/student',StudentRouter)
export default app