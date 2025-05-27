import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import NoteRouter from "./router/noteRoutes.js";
import UserRouter from "./router/userRouters.js";
import association from "./util/assocDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sevikoa3.github.io",
      "https://sevikofe-938071808488.asia-southeast2.run.app",
      "https://sevikofe-vmg5pljvnq-et.a.run.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(NoteRouter);

app.use(UserRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

const PORT = process.env.PORT;
association()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
