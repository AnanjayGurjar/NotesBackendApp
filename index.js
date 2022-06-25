const express = require('express');
const app = require('./app')

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connection with database is successful");
    app.listen(process.env.PORT, () =>{
        console.log(`Server is running at port ${process.env.PORT}`)
    });
})
.catch((error) => {
    console.log("Failed to connect with database");
    console.log(error);
})

