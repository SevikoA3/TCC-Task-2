import express from "express";
import { login, createUser } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAccessToken } from "../controller/tokenController.js";

const UserRouter = express.Router();

UserRouter.get("/token", getAccessToken);

UserRouter.post("/login", login);
UserRouter.post("/logout", () => {});

UserRouter.get("/users", verifyToken, () => {});
UserRouter.get("/user/:id", verifyToken, () => {});
UserRouter.post("/user", createUser);
UserRouter.patch("/user/:id", verifyToken, () => {});
UserRouter.delete("/user/:id", verifyToken, () => {});

export default UserRouter;
