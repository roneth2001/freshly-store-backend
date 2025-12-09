const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.signin = async (req, res) => {
  console.log("📥 Incoming signin data:", req.body);

  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        shopName: user.shopName 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log("✅ User signed in:", user._id);

    // return user data without password
    res.status(200).json({ 
      message: "Sign in successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        shopName: user.shopName,
        email: user.email,
        telephone: user.telephone,
        address: user.address
      }
    });

  } catch (error) {
    console.error("❌ Signin Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};