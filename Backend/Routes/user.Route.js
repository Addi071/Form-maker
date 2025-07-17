// backend/routes/user.route.js
import express from 'express';
import { createUser, getAllUsers, signup, login } from '../controllers/user.controller.js';

let userRoute = express.Router();

userRoute.post('/create', createUser);
userRoute.post('/signup', signup);
userRoute.post('/login', login);
userRoute.get('/all', getAllUsers);

export default userRoute;
