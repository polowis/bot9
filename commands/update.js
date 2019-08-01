const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    if(message.author.id !== "271774485508653057") return;
    
    const embed = new Discord.RichEmbed()
        .setTitle('Update')
        .setColor('#6d37c8')
        .setDescription("Update information for pooh9")
        .addField('Version 1.1.4')
        .addField('AI feature', 'The AI version 2.0 is here!')
        .addField('Custom Prefix', 'We are aware that some prefixes might be identical so we decided to release this feature')
        .addField('NSFW', "Support more nsfw sites")
        .addField("Game", "Pokemon game, guessing the pokemon name")
        .addField('Find user', "Find all the user name and tag that match your request")
        .addField("Bugs", "Improved some commands, fixed some bugs")
        .setAuthor("Polowis")
        
    message.channel.send(embed)    
}