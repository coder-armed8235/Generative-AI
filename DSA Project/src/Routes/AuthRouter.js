import express from 'express';
const authRoute = express.Router();
import { Register,Login,Logout,Profile } from '../controllers/authController.js';


authRoute.post('/signUp',Register);
authRoute.post('/signIn',Login);
authRoute.get('/logout',Logout);
authRoute.get('/profile',Profile);


export default authRoute;