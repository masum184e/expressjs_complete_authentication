import express from 'express';
import { adminData, adminLogin } from '../controller/adminController.js';
import adminAuthentication from '../middleware/adminAuthentication.js';
import { usersData, userDataById, removeUser } from '../controller/userController.js';

const adminRouter = express.Router();
adminRouter.post("/login", adminLogin);
adminRouter.get("/", adminAuthentication, adminData);
adminRouter.get("/users/all", adminAuthentication, usersData);
adminRouter.get("/users/:userId", adminAuthentication, userDataById);
adminRouter.delete("/users/:userId", adminAuthentication, removeUser);

export default adminRouter;