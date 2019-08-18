const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async(bot, message, args) =>{
    try{
    const body = await fetch('https://nekos.life/api/why').then(res => res.json())
    const embed = new Discord.RichEmbed()
    .setTitle(body.why)
    .setColor('#000000')
    message.channel.send(embed);
} catch(err){
    message.reply('Error has occured')
}
}