import express from "express";
import { user_login, user_register } from "../controllers/user_controllers";

const user_routes = express.Router();

// user register
user_routes.post("/user/register", user_register);
user_routes.post("/user/login", user_login);

export default user_routes;
