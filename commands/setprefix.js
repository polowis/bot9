const Discord = require('discord.js')
const fs = require('fs')
const guild = require('../guild.json')
const Guild = require('../models/prefix')
//const olddata = fs.readFileSync('../guild.json', 'utf-8')
//const data = JSON.parse(olddata)

module.exports.run = async (bot, message, args) =>{
    if(!args[0]) return message.channel.send("Please enter a new prefix you would like to change")

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need admin permission to do this")
    

    const newPrefix = args.join('')
    
    Guild.findOne({
        serverID: message.guild.id
    }, (err, prefix) =>{
        if(err) console.error(err)
        if(prefix){
            prefix.prefix = newPrefix
        }
        prefix.save().then(() => message.channel.send("Successfully set a new prefix of this server to " + newPrefix)).catch(err => console.log(err))
        
    })

    

}