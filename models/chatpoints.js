const mongoose = require("mongoose")

const chatpointsSchema = mongoose.Schema({
    userID: String,
    serverID: String, 
    points: Number,
    message: Number
})

module.exports = mongoose.model("chat", chatpointsSchema)