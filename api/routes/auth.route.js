import express from "express"
import { google, signin, signout, signup } from "../controllers/auth.controller.js";

const routes=express.Router();

routes.post("/signup",signup)
routes.post("/signin",signin)
routes.post("/google",google)
routes.get("/sign-out",signout)
export default routes
