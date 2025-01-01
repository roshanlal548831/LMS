import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getAllCreatorCourses, getCourseById, getCourseLecture } from "../controllers/cours.controller.js";
import { upload } from "../middleware/multer.js";
const route = express.Router();

route.route("/").post(isAuthenticated,createCourse);
route.route("/").get(isAuthenticated,getAllCreatorCourses);
route.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
route.route("/:courseId").get(isAuthenticated,getCourseById);
route.route("/:courseId/lecture").post(isAuthenticated,createLecture);
route.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);




export default route;