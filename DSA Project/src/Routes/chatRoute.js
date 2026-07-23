import express from 'express';
const chatRoute = express.Router();
import { ChatwithAI } from '../controllers/chatController.js';


chatRoute.post('/chat',ChatwithAI);



export default chatRoute;