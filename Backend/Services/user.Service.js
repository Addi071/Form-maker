// backend/services/user.service.js
import User from '../Models/user.model.js';

export const createUserService = async (email, password) => {
  const user = new User({ email, password });
  return await user.save();
};

export const getAllUsersService = async () => {
  return await User.find();
};

// Create new user (Signup)
export const createUserOne = async ({ name, email, password }) => {
  const newUser = new User({ name, email, password });
  return await newUser.save();
};

// Find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Compare passwords
export const validatePassword = async (user, enteredPassword) => {
  return user.password === enteredPassword;
};
