import express from 'express';
import { userData, userDataById, userLogin, userRegistration } from '../controller/userController.js';
import userAuthentication from '../middleware/userAuthentication.js';
import adminAuthentication from '../middleware/adminAuthentication.js';

const userRouter = express.Router();
userRouter.post("/registration", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/", userAuthentication, userData);
userRouter.get("/:userId", adminAuthentication, userDataById)

export default userRouter