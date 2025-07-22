import express from 'express';
import authRoutes from './authRoutes';
import { home } from '../controllers/homeController';
import productRoutes from './productRoutes';
import cartRoutes from './cartRoutes';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import { getProfile, updateProfile } from "../controllers/userController";
import { authenticate } from "../middleware/auth";


const router = express.Router();
dotenv.config();
connectDB();
router.get('/', home);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use("/cart", cartRoutes);


router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);


export default router;
