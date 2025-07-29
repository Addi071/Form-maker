// backend/routes/user.route.js
import express from 'express';
import { createUser, getAllUsers, signup, login } from '../Controllers/user.Controller.js';

let userRoute = express.Router();

userRoute.post('/create', createUser);
userRoute.post('/signup', signup);
userRoute.post('/login', login);
userRoute.get('/all', getAllUsers);

export default userRoute;
