import express from 'express';
import passport from 'passport';
import { createOrder, getAllOrders } from '../Controller/orderController.js';
import { isAdmin, protect } from '../Middleware/authMiddleware.js';
import { getMyOrders } from '../Controller/orderController.js';

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, isAdmin, getAllOrders);
router.get("/my-orders", passport.authenticate("jwt", { session: false }), getMyOrders);

export default router;