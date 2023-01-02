import express from "express";
import { notes_create, notes_read } from "../controllers/notes_controllers";
import user_mdw from "../middleware/user_mdw";

const notes_routes = express.Router();

// create
notes_routes.post("/notes/create", user_mdw, notes_create);

// read
notes_routes.get("/notes/read", notes_read);

export default notes_routes;
