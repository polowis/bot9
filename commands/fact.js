const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async(bot, message, args) =>{
    try{
        const body = await fetch('https://nekos.life/api/v2/fact').then(res => res.json())
        const embed = new Discord.RichEmbed()
        .setTitle('Random fact')
        .setDescription(body.fact)
        message.channel.send(embed)
    }catch(err){
        message.reply('Error 2031, aborting...')
    }
}
