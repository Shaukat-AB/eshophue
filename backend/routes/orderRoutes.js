import express from "express";
import {
    createOrderItem,
    getMyOrders,
    getOrderById,
    getOrders,
    setOrderToDelivered,
    setOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authHandler.js";

const router = express.Router();

router.route("/").post(protect, createOrderItem).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, setOrderToPaid);
router.route("/:id/deliver").put(protect, admin, setOrderToDelivered);

export default router;
