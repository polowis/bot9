const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    const embed = new Discord.RichEmbed()
        .setColor('#4433cc')
        .setTitle("Software Engineer")
        .setAuthor('Polowis')
        .setDescription("Developer of Pooh9")
        .setThumbnail('https://avatars0.githubusercontent.com/u/39208974?s=460&v=4')
    
        message.channel.send(embed)

}