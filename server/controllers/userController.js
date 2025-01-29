import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

import { sendEmail } from "../utils/sendEmail.js";


// export const register = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       address,
//       password,
//       role,
//     } = req.body;

//     if (!name || !email || !phone || !address || !password || !role) {
//       return next(new ErrorHandler("All fileds are required.", 400));
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return next(new ErrorHandler("Email is already registered.", 400));
//     }
//     const userData = {
//       name,
//       email,
//       phone,
//       address,
//       password,
//       role,
//     };
    
//     const user = await User.create(userData);
//     sendToken(user, 201, res, "User Registered.");
//   } catch (error) {
//     next(error);
//   }
// });

export const sendOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, name, phone, address, password, role } = req.body;
  
    if (!email || !name || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
  
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }
  
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  
    // Create a user record with OTP (temporary until OTP is verified)
    await User.create({
      name,
      email,
      phone,
      address,
      password,
      role,
      otp,
      otpExpires,
    });
  
    // Email content
    const subject = "Your OTP for Signup";
    const message = `Hi ${name},\n\nYour OTP for signup is: ${otp}\nIt is valid for the next 10 minutes.\n\nIf you didn't request this, please ignore this email.`;
  
    try {
      // Send OTP email
      await sendEmail({ email, subject, message });
  
      res.status(200).json({
        success: true,
        message: "OTP sent to your email.",
      });
    } catch (error) {
      // Remove the user entry if email fails
      await User.deleteOne({ email });
  
      return next(new ErrorHandler("Failed to send OTP. Please try again.", 500));
    }
});


export const login = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    return next(
      new ErrorHandler("Email, password and role are required.", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }
  sendToken(user, 200, res, "User logged in successfully.");
});


export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});


export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});


export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
    message: "Profile updated.",
  });
});


export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password & confirm password do not match.", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully.");
});


export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required.", 400));
    }
  
    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
  
    // Verify the password
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Incorrect password.", 401));
    }
  
    // Delete the user using deleteOne()
    await User.deleteOne({ _id: user._id });
  
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
});


export const registerWithOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return next(new ErrorHandler("Email and OTP are required.", 400));
    }
  
    const user = await User.findOne({ email }).select("+otp +otpExpires");
  
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
  
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return next(new ErrorHandler("Invalid or expired OTP.", 400));
    }
  
    // Clear OTP fields and save the user
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
  
    sendToken(user, 201, res, "Signup completed successfully.");
});
  
  
  
  