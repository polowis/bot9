const mongoose = require("mongoose")

const moneySchema = mongoose.Schema({
    userID: String,
    exp: Number,
    money: Number,
    level: Number,
    timeluck: Number,
    timedaily: Number
        
})

module.exports = mongoose.model("Money", moneySchema)