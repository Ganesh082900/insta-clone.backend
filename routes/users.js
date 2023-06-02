const express = require("express")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/user")

// <<< POST METHOD for bcrypt the password , and register the user in DB >>>>>

userRoute.post("/register", (req, res) => {

    let userData = req.body;
    bcrypt.hash(userData.password, 10).then((encryptedPin) => {
        const user = new User({
            name: userData.name,
            email: userData.email,
            password: encryptedPin
        });
        // Save the data to DB
        user.save().then((record) => {
            res.status(201).json({
                message: "Registerd succesfully !",
                data: record
            })
        }).catch((error) => {
            res.status(500).json({
                message: " Error during Registration "
            })
        })

    }).catch((error) => {
        res.status(500).json({
            message: "Authentication failed "
        })
    })

})

// <<< POST METHOD for bcrypt the entered password and compare , and login the user into  acct >>>>>

userRoute.post("/login", (req, res) => {
    let userData = req.body;

    // First check for the email id , present in the DB;
    User.findOne({ email: userData.email }).then((record) => {
        if (record) {
            // Check for the password matching ....
            return bcrypt.compare(userData.password, record.password).then((status) => {
                if (status) {
                    // Genrate the jwt token
                    return jwt.sign({ email: record.email, id: record._id }, "Ganesh-Instagram", { expiresIn: "12hr" }, (error, token) => {
                        if (error) {
                            return res.status(500).json({
                                message: "Authentication Failed",
                                error: error
                            });
                        }
                        return res.status(201).json({
                            message: "Authentication successfully ",
                            token: token
                        })
                    })
                } else {
                    res.send(401).json({
                        message: "Authentication Failed",
                        error: error
                    })
                }
            })

        } else {
            res.send(401).json({
                message: "Authentication Failed",
                error: error
            })
        }
    }).catch((error) => {
        res.send(401).json({
            message: "Authentication Failed",
            error: error
        })
    })

})



// userRoute.get("/userslist", (req, res) => {
//     res.send(User)
// })

module.exports = userRoute