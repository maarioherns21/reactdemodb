import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv, { config } from "dotenv";
import bodyParser from "body-parser";

import indexRouter from "./routes/movie.js";
import userIndex from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb" }));

app.use(cors());

app.use("/api/movies", indexRouter);
app.use("/api/users", userIndex);

mongoose.set("strictQuery", false);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Express is listening on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
