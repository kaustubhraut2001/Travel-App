const router = require("express").Router();
const pin = require("../Models/pin");



// creat the new user
router.post("/", async(req, res) => {
    const newpin = new pin(req.body);
    try {
        const savepin = await newpin.save();
        res.status(200).json(savepin);

    } catch (err) {
        res.status(500).json(err);
    }

});

// get all the users
router.get("/", async(req, res) => {
    try {
        const pinf = await pin.find();
        res.status(200).json(pinf);

    } catch (err) {
        res.status(501).json(err);
    }

});



module.exports = router;