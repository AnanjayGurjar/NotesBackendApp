const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Get request at home route");

})


module.exports = app;