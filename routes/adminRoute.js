import express from 'express';
import { adminData, adminLogin } from '../controller/adminController.js';
import adminAuthentication from '../middleware/adminAuthentication.js';

const adminRouter = express.Router();
adminRouter.post("/login", adminLogin);
adminRouter.get("/", adminAuthentication, adminData);

export default adminRouter;