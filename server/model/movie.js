import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const commentSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
  },
  {
    timestamps: true,
  }
);

export const likeSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const movieSchema = new Schema({
  name: String,
  body: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
  comments: [commentSchema],
  likes: [likeSchema],
  createdAt: { type: Date, default: new Date() },
});

const Movie = mongoose.model("Movie", movieSchema);
export const Comment = mongoose.model("Comment", commentSchema);
export const Like = mongoose.model("Like", likeSchema);

export default Movie;
