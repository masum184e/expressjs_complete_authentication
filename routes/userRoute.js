import express from 'express';
import { userLogin, userRegistration } from '../controller/userController.js';

const userRouter = express.Router();
userRouter.post("/registration", userRegistration);
userRouter.post("/login", userLogin);

export default userRouter