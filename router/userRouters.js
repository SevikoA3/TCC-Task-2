import express from 'express';
import { login, register } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const UserRouter = express.Router();

UserRouter.post('/login', login);
UserRouter.post('/logout', () => {});
UserRouter.post('/register', register);

UserRouter.get('/users', verifyToken, () => {});
UserRouter.get('/user/:id', verifyToken, () => {});
UserRouter.post('/user', verifyToken, () => {});
UserRouter.patch('/user/:id', verifyToken, () => {});
UserRouter.delete('/user/:id', verifyToken, () => {});

export default UserRouter;