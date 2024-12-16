import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse } from "../controllers/cours.controller.js";
const route = express.Router();

route.route("/").post(isAuthenticated,createCourse);




export default route;