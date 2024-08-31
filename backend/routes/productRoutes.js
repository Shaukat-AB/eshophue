import express from "express";
import {
    getProducts,
    getTopProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authHandler.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/top", getTopProducts);

router
    .route("/:id")
    .get(getProductById)
    .put(protect, admin, editProduct)
    .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
