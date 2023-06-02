// Defining the mongoose.Schema for the Posts

const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    name: { type: String },
    location: { type: String },
    postImage: { type: String },
    description: { type: String, default: "" },
    date: { type: Date, default: new Date().toJSON().slice(0, 10) },
    likes: { type: Number, default: 0 },
    // postedBy : {type : mongoose.Schema.Types.ObjectId , required : true}
});

module.exports = mongoose.model("Post", postSchema)