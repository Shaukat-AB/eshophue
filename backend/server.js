import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import { stripeCheckout, stripeWebhook } from "./controllers/payController.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authHandler.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB(); // Connect to MongoDB
const port = process.env.PORT || 3000;
const app = express();

// Cors middleware
app.use(cors());

// stripe webhook
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/upload", uploadRouter);

// Stripe checkout
app.post("/create-checkout-session", protect, stripeCheckout);

// Make uploads and build folder static
const __dirname = path.resolve(); // Set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV != "development") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    // Routes will be redirected to index.html
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
        );
    });
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
