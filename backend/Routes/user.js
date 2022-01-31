const router = require("express").Router();
const user = require("../Models/Users");
const bcrypt = require('bcrypt');


// register
router.post("/register", async(req, res) => {
    // generate new one then creat new user save the user and send resonse

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password, saltRounds);

        const newuser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashpass

        });
        const newusers = await newuser.save();
        res.status(200).json(newusers._id);
    } catch (err) {
        res.status(500).json(err);
    }

});

// login
router.post("/login", async(req, res) => {
    try {


        const usere = await user.findOne({ username: req.body.username });
        !usere && res.status(400).json("wrong uesr name or password");
        const validpass = await bcrypt.compare(req.body.password, usere.password);

        !validpass && !usere && res.status(400).json("wrong uesr name or password");

        res.status(200).json({ _id: usere._id, username: usere.username });





    } catch (err) {
        res.status(500).json(err);
    }

});






module.exports = router;