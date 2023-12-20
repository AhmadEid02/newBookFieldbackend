const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Add this line for JWT
const fieldsRoutes = require('./routes/fields');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/fields', fieldsRoutes);
app.use('/user', userRoutes);
app.use('/book', bookRoutes);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("connected to DB and listening on port 4000")})
})






