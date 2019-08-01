const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("I am afraid that you may not have permission to do that")
    if(!args[0]) return message.reply("Please mention a valid user so I can process your request")
    const user = message.mentions.users.first()
    const roleToAdd = args.slice(1).join(' ')
    if(!user){
        return message.reply("I am unable to find this user, please make sure they are in this server")
    }
    if(user){
        const member = message.guild.member(user)
        if(member){
            const newRole = message.guild.roles.find(role => role.name == roleToAdd)
            if(!newRole){
                return message.reply('I cannot find this role in the server, please check your spelling')
            }
            else{
                member.addRole(roleToAdd)
                    .then(() =>{
                        message.reply(`Successfully added role ${roleToAdd} to user ${member}`)
                    }).catch(err =>{
                        message.reply('I was unable to add this role to the user, please check my permissions')
                        console.error(err)
                    })
        }
    }

    }
}