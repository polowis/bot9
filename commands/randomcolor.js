const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
    try{
        let hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6);
        const embed = new Discord.RichEmbed()
        .setColor(hex)
        .setDescription(`Random hex code ${hex}`)
        .setTitle(`#${hex}`)
        message.channel.send(embed);
    } catch(err){
        message.channel.send("An error has occured")
    }
}