import express from 'express';
import 'dotenv/config'
import authRoute from './src/Routes/AuthRouter.js';
import chatRoute from './src/Routes/chatRoute.js';

const app= express();
app.use(express.json());
app.use('/auth',authRoute);
app.use('/user',chatRoute);

app.listen(4000,()=>{
    console.log("Listing at port number 4000");
})