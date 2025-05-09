const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"], // Only these two roles are allowed
      default: "user", // Default to 'user' if not provided
    },
    resetPasswordToken: { type: String, default: null }, // Token for password reset
    resetPasswordExpires: { type: Date, default: null }, // Expiration date for the reset token
  },
  {
    timestamps: true, // Optional, adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", UserSchema);
