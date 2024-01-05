import express from 'express';
import { userData, userLogin, userRegistration } from '../controller/userController.js';
import userAuthentication from '../middleware/userAuthentication.js';

const userRouter = express.Router();
userRouter.post("/registration", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/", userAuthentication, userData);

export default userRouter