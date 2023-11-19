const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")
const JWT_Secret = "AllYouHadToDoWasFollowTheDamnTrainCJ"



// Route1: Post request on endpoint /createUser & create a user
router.post("/createUser", [
    check('username').notEmpty().isLength({ min: 3 }).withMessage("Username should be atleast 3 characters"),
    check('emailID').isEmail().withMessage("@ should be available"),
    check('password').isLength({ min: 5 }).withMessage("Username should be atleast 5 characters")
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Find user if its email is already in the database
        let user = await User.findOne({ emailID: req.body.emailID })
        if (user) {
            return res.status(400).json({ error: "User with this Email is already exist" })
        }

        // Password hash is created & salt is appended to it
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Creating a valid user in the database
        user = await User.create({
            username: req.body.username,
            emailID: req.body.emailID,
            password: secPass
        })


        const data = {
            user: {
                id: user.id
            }
        }

        // JWT signature or tken is generating for authentication
        const authToken = jwt.sign(data, JWT_Secret)
        success = true;
        res.json({ authToken, success })
    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured");
    }
})

// Route2: Post request on endpoint /login
router.post("/login", [
    check('emailID').isEmail().withMessage("@ should be available"),
    check('password').exists().withMessage("Password cannot be Blank")
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { emailID, password } = req.body;
    try {
        // Find user if its email is already in the database
        const user = await User.findOne({ emailID });
        if (!user) {
            return res.status(400).json({ success, errors: "Check your Credentials correctly" });
        }

        // Comprare the entered password with the password hash if it unmatch then error 400
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Check your Credentials correctly" });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_Secret)
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured");
    }
})

// Route3 Post request on endpoint /getuser to get user detail but the user should be logged in
router.post("/getuser", fetchuser, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        success = true;
        res.send(success, user)
    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured");
    }
})

module.exports = router;