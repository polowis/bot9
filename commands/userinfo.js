const Discord = require('discord.js')

module.exports.run = async (bot, message, args) =>{
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This is your info")
        .setColor("#985986")
        .addField("Username", (message.author.username) + "#" + (message.author.discriminator))
        .addField("ID", (message.author.id))
        .addField("Create at: ", (message.author.createdAt))
        .setThumbnail(message.author.avatarURL)

        message.channel.send(embed)
}