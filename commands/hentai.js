const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send("Checking out.. please wait")
    if(!message.channel.nsfw) return message.channel.send("Cannot display nsfw content in sfw channel")

    const body  = await fetch("https://nekobot.xyz/api/image?type=hentai").then(res => res.json())
    console.log(body.message)
    msg.delete()
    const embed = new Discord.RichEmbed()
        .setTitle("Click here if the image failed to load")
        .setURL(body.message)
        .setColor("#000000")
        .setImage(body.message)
        .setFooter(`Requested by ${message.author.tag}`)

    message.channel.send(embed)
}