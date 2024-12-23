import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, getAllCreatorCourses } from "../controllers/cours.controller.js";
const route = express.Router();

route.route("/").post(isAuthenticated,createCourse);
route.route("/").get(isAuthenticated,getAllCreatorCourses);




export default route;