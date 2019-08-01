const Discord = require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new Discord.RichEmbed()
        .setDescription("This is the server info!")
        .setColor("#42e8f4")
        .addField("Server name", (message.guild.name))
        .addField("Member", (message.guild.memberCount))
        .addField("Owner", (message.guild.owner))
        .addField("OwnerID", (message.guild.ownerID))
        .addField("Region", (message.guild.region))
        .addField("Created at", (message.guild.createdAt))
        .addField("Server Emojis", (message.guild.emojis))
        .addField("Verification level", (message.guild.verificationLevel))
        .setThumbnail(message.guild.iconURL);
    message.channel.send(embed)
}