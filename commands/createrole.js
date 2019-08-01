const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('I am afraid that you may not have permission to perform this action')
    
}