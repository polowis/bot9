const Discord = require('discord.js')

module.exports.run = async(bot, message, args)=>{

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("You don't have permission to do that")
    if(!args[0]) return message.channel.send("Please mention a valid user")
    const user = message.mentions.users.first()
    
    if(!user){
        return message.reply("I cannot find this user in the server")
    }
  //if(!message.channel.permissionsFor(bot.user).has("KICK_MEMBERS")){
    //    return message.reply('I cannot ban this user! Do they have a higher role or do I have kick permission')
   // }

    
    const reason = args.slice(1).join(' ')

    console.log(reason)

    if(user){
        const member = message.guild.member(user)
        if(member){
            member.kick({
                reason: reason
            }).then(() =>{
                message.reply(`Succeffuly Kicked ${user.tag} \n Reason: ${reason}`)

                const banChannel = message.guild.channels.find('name', 'goodbye')
                if(!banChannel) return;
        
                const user = message.guild.members.get(message.author.id).user
                const banEmbed = new Discord.RichEmbed()
                    .setTitle('Kick')
                    .setColor(0xbc0000)
                    .addField('Kick user', `${user.username} with ID: ${message.author.id}`)
                    .addField('Reason', "Spamming")
                    .setTimestamp(new Date())
                banChannel.send(banEmbed)

            }).catch(err =>{
                message.reply("I was unable to kick the member, please check my permission")
                console.error(err)
            })
        }
    }

}