const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoutes = require('./Routes/userRoute');

const app = express();
app.use(express.json());

mongoose.connect(process.env.mongodb);

app.use('/users', userRoutes);

const port = process.env.port;
app.listen(port ,()=>{
    console.log('Server is running at ',port);
});