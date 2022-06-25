const express = require('express');
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
require('dotenv').config();

app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
    res.send("Get request at home route");

})




module.exports = app;