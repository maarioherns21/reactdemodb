import express from "express";
import { commentMovie, createMovie, deleteMovie, index, likeMovie, movieDetails, updateMovie } from "../controllers/movies.js";
const router = express.Router();



router.get("/", index);

router.post("/create", createMovie);

router.delete("/:id", deleteMovie);

router.patch("/:id", updateMovie);

router.post("/:id/likes", likeMovie);

router.post("/:id/comments", commentMovie);

router.get("/:id" , movieDetails)

export default router;
