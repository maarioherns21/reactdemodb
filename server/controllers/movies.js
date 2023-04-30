import mongoose from "mongoose";
import Movie, { Comment, Like } from "../model/movie.js";

export const index = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movie = req.body;
    console.log(req.body);

    const newMovie = new Movie({
      ...movie,
      user: mongoose.Types.ObjectId.createFromHexString(req.body.user),
    });
    console.log(newMovie);
    const data = await newMovie.save();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = req.body;
    const newMovie = { ...movie, _id: id };

    const updateMovie = await Movie.findByIdAndUpdate(id, newMovie, {
      new: true,
    });

    res.status(200).json(updateMovie);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Movie.findByIdAndDelete(id);

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export const likeMovie = async (req, res) => {
  try {
    const userLike = req.body;
    const { id } = req.params;
    console.log(userLike);
    const movie = await Movie.findById(id);

    const like = new Like(userLike);
    
    const saveLike = await like.save()

    movie.likes.push(saveLike);

    const data = await Movie.findByIdAndUpdate(id, movie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};


export const commentMovie = async (req, res) => {
  try {
    const comment = req.body;
    const { id } = req.params;

    const movie = await Movie.findById(id);

    const newComment = new Comment({ ...comment });

    const saveComment = await newComment.save();

    movie.comments.push(saveComment);

    const data = await Movie.findByIdAndUpdate(id, movie, { new: true });

    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};


export const movieDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const findMovie = await Movie.findById(id)
      .select("name body user image comments likes")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate("user", "-password")
      .exec();

    res.status(200).json(findMovie);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};
