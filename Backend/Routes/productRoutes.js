import express from 'express';
import { getProducts } from '../Controller/productController.js';
import { getProductById } from '../Controller/productController.js';

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;