import dotenv from 'dotenv';
dotenv.config();
import connectDb from "./dbConnection/db.js";
import express from "express";
import cookieParser from 'cookie-parser';
import route from './routes/user.route.js';
import cors from "cors"
const app = express();
const port = process.env.PORT || 3000;

// call database connection
connectDb();

app.get("/",(req,res)=> {
    res.send("serer run success fully")
});

// middlewaew
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods:["GET","POST","PUT"]
}))


// api
app.use("/api/v1/user",route)

app.listen(port,()=>{
    console.log(`server run http://localhost:${port}`)
})