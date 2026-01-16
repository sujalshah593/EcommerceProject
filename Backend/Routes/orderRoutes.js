import express from 'express';
import { createOrder, getAllOrders } from '../Controller/orderController.js';
import { isAdmin, protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, isAdmin, getAllOrders);

export default router;