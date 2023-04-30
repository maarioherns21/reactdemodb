import express from "express";
import { index, login, profile, signup } from "../controllers/user.js";
const router = express.Router();

router.get("/", index);

router.post("/login", login);

router.post("/signup", signup);

router.get("/:id", profile);

export default router;
