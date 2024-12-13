import express from "express";
import { editProfile, getUserProfile, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";
const route = express.Router();

route.route("/register").post(register);
route.route("/login").post(login);
route.route("/profile").get(isAuthenticated,getUserProfile);
route.route("/logout").get(logout);
route.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),editProfile)



export default route;