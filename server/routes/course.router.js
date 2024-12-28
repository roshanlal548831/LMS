import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, editCourse, getAllCreatorCourses } from "../controllers/cours.controller.js";
import { upload } from "../middleware/multer.js";
const route = express.Router();

route.route("/").post(isAuthenticated,createCourse);
route.route("/").get(isAuthenticated,getAllCreatorCourses);
route.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);




export default route;