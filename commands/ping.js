const Discord = require("discord.js")

module.exports.run = async(bot, message, args) =>{
    message.channel.send("Pong! " + [(Date.now() - (message.author.createdTimestamp))] + "ms")
}