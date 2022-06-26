const express = require('express');
const app = require('./app');


const mongoose = require('mongoose');

require('dotenv').config();     //this line will readd all the variables listed in .env file and will make all the variables to system variables

const port = process.env.PORT || process.env.PORT_NUMBER;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connection with database is successful");
    app.listen(port, () =>{
        console.log(`Server is running at port ${port}`)
    });
})
.catch((error) => {
    console.log("Failed to connect with database");
    console.log(error);
})

