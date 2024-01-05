import express from 'express';
import { removeUser, userData, userDataById, userLogin, userRegistration, usersData } from '../controller/userController.js';
import userAuthentication from '../middleware/userAuthentication.js';
import adminAuthentication from '../middleware/adminAuthentication.js';

const userRouter = express.Router();
userRouter.post("/registration", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/", userAuthentication, userData);
userRouter.get("/all", adminAuthentication, usersData);
userRouter.get("/:userId", adminAuthentication, userDataById);
userRouter.delete("/:userId", adminAuthentication, removeUser);

export default userRouter