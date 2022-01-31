const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();
// import dotenv from 'dotenv'
const dotenv = require('dotenv');
const Pinss = require('./Routes/Pins');
const users = require('./Routes/user');
const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDb connetde succesfully");
}).catch((err) => console.log(err));


app.use("/api/Pinss", Pinss);
app.use("/api/users", users);

app.listen(8800, () => {
    console.log(`Listning on port ${8800}`);

})