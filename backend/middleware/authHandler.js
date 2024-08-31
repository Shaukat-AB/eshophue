import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt; // read jwt from the cookie
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get decoded User by id exclude password
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// Admin middleware
export const admin = (req, res, next) =>{
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error("Not authorized as admin");
    }
}