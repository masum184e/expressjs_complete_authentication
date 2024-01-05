import express from 'express';
import { userRegistration } from '../controller/userController.js';

const userRouter = express.Router();
userRouter.post("/registration", userRegistration);

export default userRouter