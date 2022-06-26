const express = require('express');
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
require('dotenv').config();


//middlewares
app.use(express.json());

app.use(cors());        //will add some headers to the api response


/************Logger for development purpose only**************/
// app.use((req, res, next)=>{
//     console.log(`Http method - ${req.method} , URL - ${req.url}`);
//     next();
// });

//routes
app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
    res.send("Get request at home route");

})




module.exports = app;