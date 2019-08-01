const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    if(isNaN(args[0])) return message.channel.send("Please enter a valid amount of message you want to purge")
    
    if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("You don't have permission to perform this action")

    if(args[0] > 100)
        return message.channel.send("I can only delete fewer than 100 messages at once")
    msg = await message.channel.send("deleting...")
    message.channel.bulkDelete(args[0])
        .then(console.log)
        .catch(console.error)
    msg.delete()
}