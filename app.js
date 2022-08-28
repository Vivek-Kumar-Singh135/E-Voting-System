const dotenv = require('dotenv')
const express = require('express')
const app = express();
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })
require('./DB/connection')
app.use(express.json())
app.use(require('./Router/auth'));
//const User = require('./model/userSchema')
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV == 'production')
    app.use(express.static('frontend/build'));

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})