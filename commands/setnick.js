const Discord = require('discord.js')

module.exports.run = async(bot, message, args)=>{
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("I am afraid that you may not have permission to do that")
    if(!args[0]) return message.reply("Please mention a valid user so I can process your request")
    const user = message.mentions.users.first()
 
    if(!user){
        return message.reply("I am unable to find this user, please make sure they are in this server")
    }
   // if(!message.bot.hasPermission("MANAGE_NICKNAMES")){
     //   return message.reply("I don't have permission to perform this action")
   // }
    const newNickName = args.slice(1).join(' ')

    if(user){
        const member = message.guild.member(user)
        if(member){
            member.setNickname(newNickName)
                .then(() =>{
                    message.reply("Successfully changed user's nickname to " + newNickName)
                }).catch(err =>{
                    message.reply("I was unable to change this user's nickname, I am afraid that I don't have permission to perform this action or this user might have a higher role")
                    console.error(err)
                })
        }
    }
}