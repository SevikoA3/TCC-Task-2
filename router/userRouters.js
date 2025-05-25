import express from "express";
import { login, logout, createUser } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAccessToken } from "../controller/tokenController.js";

const UserRouter = express.Router();

UserRouter.get("/token", getAccessToken);

UserRouter.post("/login", login);
UserRouter.post("/logout", logout);

UserRouter.post("/user", createUser);
// Placeholder routes for user operations
UserRouter.get("/users", verifyToken, () => {});
UserRouter.get("/user/:id", verifyToken, () => {});
UserRouter.patch("/user/:id", verifyToken, () => {});
UserRouter.delete("/user/:id", verifyToken, () => {});

export default UserRouter;
