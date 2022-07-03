const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");



// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password, avatar: { public_id: "sample", url: "sample" } });

    sendToken(user, 201, res);
})
// Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User does not exist or Invalid email", 404));
    }

    const isPassword = await user.comparePassword(password);

    if (!isPassword) {
        return next(new ErrorHandler("Wrong password!", 401));
    }
    sendToken(user, 200, res);
})

// LogOut
exports.logOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({ success: true, message: "Logged out successfully" });
})

// Get users Detail

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");

    const { password, ...others } = user._doc
    res.status(200).json({ success: true, user: { ...others } });
})
// Change Password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})
// Update Profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
})

// Get All Users __Admin

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
})

// Get Single User __Admin

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    });
})

// Update User Role __Admin

exports.updateRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
})
// Delete User __Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
})