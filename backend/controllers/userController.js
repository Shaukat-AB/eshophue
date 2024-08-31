import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";

// @desc    Register user
// @route   POST /users/
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        createToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error("User already exists");
    }
});

// @desc    Get users
// @route   GET /users/
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
    const size = 8; // Users per page
    const page = Number(req.query?.pageParam) || 1;
    const count = await User.countDocuments();
    const pages = Math.ceil(count / size);

    const users = await User.find({ _id: { $ne: req.user._id } })
        .limit(size)
        .skip(size * (page - 1))
        .select("-password");

    if (users) {
        res.status(200).json({ users, pages, page });
    } else {
        res.status(404);
        throw new Error("No users found");
    }
});

// @desc    Auth user and get token
// @route   POST /users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatched = await user?.matchPassword(password);

    if (user && passwordMatched) {
        createToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Logout user and clear cookies
// @route   POST /users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie =
        ("jwt",
        "",
        {
            httpOnly: true,
            expiresIn: new Date(0),
        });
    res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User profile not found");
    }
});

// @desc    Update user profile using json web token
// @route   PUT /users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User profile not found");
    }
});

// @desc    Delete user by id
// @route   DELETE /users/:id
// @access  Private
export const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user && !user.isAdmin) {
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: "User delete was successful", user });
    } else {
        if (user?.isAdmin) {
            res.status(400);
            throw new Error("Admin User can not be deleted");
        }
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get user by id
// @route   GET /users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user by id
// @route   PUT /users/:id
// @access  Private/Admin
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User profile not found");
    }
});
