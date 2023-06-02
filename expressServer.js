const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")

// handling cors error
const cors = require('cors');

const corsOptions = {
    origin: 'https://instagram-clone-kr9g.onrender.com/post',
    credentials: true,
    optionSuccessStatus: 200
}


const app = express();
const PORT = process.env.PORT || 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// provide the mangoDB password/link to connect to the DB
mongoose.connect("mongodb+srv://ganeshpendyala2000:nswCMvG0HAL7wjwY@cluster0.cyzikyo.mongodb.net/?retryWrites=true&w=majority")
    .then((response) => {
        console.log("Connected to DB successfully ! ")
    }).catch((error) => {
        console.log("Connection Failed")
    })

// app.use("/user", userRoute)
app.use(cors(corsOptions));
app.use("/post", postRoute)

app.use((req, res) => {
    res.status(200).json({
        message: "Server running Successfuylly ! "
    });
});


app.listen(PORT)

module.exports = app