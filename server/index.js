import dotenv from 'dotenv';
dotenv.config();
import connectDb from "./dbConnection/db.js";
import express from "express";
import cookieParser from 'cookie-parser';
import route from './routes/user.route.js';
const app = express();
const port = process.env.PORT || 3000;

// call database connection
connectDb();

app.get("/",(req,res)=> {
    res.send("sdfjasd fdsakjl fhdsfskh ")
});

// middlewaew
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// api
app.use("/api/v1/user",route)

app.listen(port,()=>{
    console.log(`server run http://localhost:${port}`)
})