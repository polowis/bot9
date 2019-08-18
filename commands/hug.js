const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async(bot, message, args) =>{
    try{
        const body = await fetch('https://nekos.life/api/hug').then(res.json())
        const embed = new Discord.RichEmbed()
        .setImage(body.url)
        message.channel.send(embed);
    } catch(err){
        message.reply('Error..')
    }
}