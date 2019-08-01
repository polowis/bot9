const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async(bot, message, args) =>{
    const request = await fetch('https://api.bunnies.io/v2/loop/random/?media=gif,png').then(res => res.json())
    const result = request.media.poster
    const embed = new Discord.RichEmbed()
        .setTitle('Click here if the image failed to load')
        .setURL(result)
        .setImage(result)
        .setFooter(`Requested by ${message.author.tag}`)
    message.channel.send(embed)
}