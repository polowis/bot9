const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    const users = bot.users;

    const searchTerm = args[0]
    if(!args[0]) return message.channel.send('Please provide a search term')

    const matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    if(matches.length < 1){
        return message.channel.send('No username found')
    }
    else{
        return message.channel.send(matches.map(u => u.tag).join(', '))
    }
}