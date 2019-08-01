const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async(bot, message, args) =>{
    const data = await fetch('https://randomfox.ca/floof/').then(res => res.json())
    const embed = new Discord.RichEmbed()
        .setTitle('Click here if the image failed to load')
        .setURL(data.image)
        .setImage(data.image)
        .setFooter(`Requested by ${message.author.tag}`)
    message.channel.send(embed)
   }