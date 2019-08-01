const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission('CHANGE_NICKNAME')) return message.reply("You do not have permission to change your nickname")
    if(!args[0]) return message.reply('Please provide your nickname')
    const newNickname = args.join(' ')
    
    message.member.setNickname(newNickname)
        .then(()=>{
            message.reply(`Your nickname now is ${newNickname} `)
        })
        .catch(err =>{
            message.reply("I was unable to change your nickname, please check my permission")
        })
}