import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String, required: true 
    },
    rating: {
        type: Number, required: true, default: 0
    },
    comment: {
        type: String, required: true 
    },
}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        name: {
            type: String, required: true 
        },
        ref: "User",
    },
    name: {
        type: String, required: true 
    },
    image: {
        type: String,
    },
    description: {
        type: String, required: true
    },
    brand: {
        type: String, required: true
    },
    category: {
        type: String, required: true 
    },
    price: {
        type: Number, required: true, default: 0
    },
    inStock: {
        type: Number, required: true, default: 0
    },
    rating: {
        type: Number, required: true, default: 0
    },
    reviewsCount: {
        type: Number, required: true, default: 0
    },
    reviews: [reviewSchema],
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export default Product;