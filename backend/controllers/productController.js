import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import removeFile from "../utils/removeFile.js";

// @desc    Fetch all products
// @route   GET /products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query?.keyword
        ? { name: { $regex: req.query?.keyword, $options: "i" } }
        : {};

    const size = 8; // Products per page
    const page = Number(req.query?.pageParam) || 1;
    const count = await Product.countDocuments({ ...keyword });
    const pages = Math.ceil(count / size);

    const products = await Product.find({ ...keyword })
        .limit(size)
        .skip(size * (page - 1));
    res.status(200).json({ products, page, pages });
});

// @desc    Get top rated products
// @route   GET /products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
});

// @desc    Fetch product by id
// @route   GET /products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Resource not found");
    }
    res.json(product);
});

// @desc    Creat a product
// @route   POST /products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        user: req.user._id,
        image: "",
        brand: "Sample Brand",
        category: "Electronics",
        description: "Sample description",
    });
    const newProduct = await product.save();
    if (newProduct) {
        res.status(201).json(newProduct);
    } else {
        res.status(500);
        throw new Error("Product was not created.");
    }
});

// @desc    Edit a product
// @route   PUT /products/:id
// @access  Private/Admin
export const editProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, inStock } =
        req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        // Remove old image file
        if (product.image !== image) removeFile(product.image);

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.inStock = inStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(500);
        throw new Error("Product was not Updated.");
    }
});

// @desc    Delete a product by Id
// @route   DELETE /products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
        // Delete product image
        removeFile(product.image);

        res.status(200).json({ message: "Product deleted", product });
    } else {
        res.status(404);
        throw new Error("Product was not deleted.");
    }
});

// @desc    Create a review
// @route   POST /products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const { rating, comment } = req.body;

    if (product) {
        const haveReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );
        if (haveReviewed) {
            res.status(400);
            throw new Error("Product have been reviewed.");
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.reviewsCount = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added", review });
    } else {
        res.status(404);
        throw new Error("Review was not added.");
    }
});
