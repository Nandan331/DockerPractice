import express, { Router } from "express";
import { Signup1, SignUp2, getUser, loginUser, logoutUser } from "../controllers/userController.js";

const routes = express.Router();

routes.post("/signup-step1", Signup1);
routes.post("/signup-step2", SignUp2);
routes.post("/login", loginUser);
routes.post("/logout",logoutUser);
routes.get("/getuser", getUser);




export default routes;