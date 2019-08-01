const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async(bot, message, args)=>{
try{
    const body = await fetch('http://www.splashbase.co/api/v1/images/random?images_only=true').then(res => res.json())
    const embed = new Discord.RichEmbed()
    .setTitle('Random picture')
    .setURL(body.url)
    message.channel.send(embed)
}catch(err){
    message.reply('An error occured while fetching');
}
}