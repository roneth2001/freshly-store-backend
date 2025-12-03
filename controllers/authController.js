const User = require("../models/Users");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log("📥 Incoming signup data:", req.body);

  try {
    const { firstName, lastName, shopName, address, telephone, email, password } = req.body;

    // check required fields
    if (!firstName || !lastName || !shopName || !address || !telephone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({
      firstName,
      lastName,
      shopName,
      address,
      telephone,
      email,
      password: hashedPassword
    });

    console.log("✅ User created:", user._id);

    res.status(201).json({ message: "Account created successfully", userId: user._id });

  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
