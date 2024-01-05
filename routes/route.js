import express from 'express';
import userRouter from './userRoute.js';
import adminRouter from './adminRoute.js';

const router = express.Router();

router.use("/users", userRouter);
router.use("/admins", adminRouter);

export default router;