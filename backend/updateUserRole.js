require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust path if necessary

async function updateUserRole() {
  try {
    // Connect to MongoDB using the URI from the environment variable
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("MONGO_URI is not defined in the .env file.");
      return;
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const userId = "68135f0ac0aff8bce6cc16e5"; // The user ID you want to update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "user" }, // Set the role to "admin"
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      console.log(`User updated: ${updatedUser.email} is now an user.`);
    } else {
      console.log("User not found.");
    }

    // Close the connection to the database
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}

updateUserRole();
