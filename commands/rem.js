const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "rem",
    description: "Someone needs rem",
    usage: "rem",
    category: "Fun"
}

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send("Checking out.. please wait")
   // if(!message.channel.nsfw) return message.channel.send("Cannot display nsfw content in sfw channel")

    const body  = await fetch("https://rra.ram.moe/i/r?type=rem").then(res => res.json())
    //console.log(body.message)
    msg.delete()
    const embed = new Discord.RichEmbed()
        .setTitle("Click here if the image failed to load")
        .setURL(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
        .setColor("#000000")
        .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
        .setFooter(`Requested by ${message.author.tag}`)

    message.channel.send(embed)
}