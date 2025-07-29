// backend/controllers/user.controller.js
import { createUserService, getAllUsersService, createUserOne, findUserByEmail, validatePassword } from '../services/user.Service.js';

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await createUserService(email, password);
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.json(users);
};

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered", success:false });
    }

    // Create new user
    const newUser = await createUserOne({ name, email, password });

    res.status(201).json({
      message: "Signup successful",
      success:true,
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success:false });
    }

    // Check password
    const isMatch = await validatePassword(user, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      success:true,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

