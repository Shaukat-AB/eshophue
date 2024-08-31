import express from "express";
import {
    getUserProfile,
    updateUserProfile,
    getUsers,
    logoutUser,
    authUser,
    registerUser,
    getUserById,
    deleteUserById,
    updateUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authHandler.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers).post(registerUser);

router.post("/logout", logoutUser);
router.post("/login", authUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route("/:id")
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUserById)
    .put(protect, admin, updateUserById);

export default router;
