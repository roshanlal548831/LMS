import dotenv from 'dotenv';
dotenv.config();
import connectDb from "./dbConnection/db.js";
import express from "express";
import cookieParser from 'cookie-parser';


import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.router.js';
import mediaRoute from './routes/course.router.js';



import cors from "cors"
const app = express();
const port = process.env.PORT || 3000;

// call database connection
connectDb();

app.get("/", (req, res) => {
    res.send("serer run success fully")
});

// middlewaew
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT"]
}))


// api
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)


app.listen(port, () => {
    console.log(`server run http://localhost:${port}`)
})