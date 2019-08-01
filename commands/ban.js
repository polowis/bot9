const Discord = require('discord.js')

module.exports = {
    
}

module.exports.run = async(bot, message, args)=>{
    if(!args[0]) return message.channel.send("Please mention a valid user")
    const user = message.mentions.users.first()

    if(!user){
        return message.reply("I cannot find this user in the server")
    }
    if(!user.bannable){
        return message.reply('I cannot ban this user! Do they have a higher role or do I have ban permission')
    }

    
    const reason = args.slice(1).join(' ')

    console.log(reason)

    if(user){
        const member = message.guild.member(user)
        if(member){
            member.ban({
                reason: reason
            }).then(() =>{
                message.reply(`Succeffuly banned ${user.tag} \n Reason: ${reason}`)

                const banChannel = message.guild.channels.find('name', 'goodbye')
                if(!banChannel) return;
        
                const user = message.guild.members.get(message.author.id).user
                const banEmbed = new Discord.RichEmbed()
                    .setTitle('Ban')
                    .setColor(0xbc0000)
                    .addField('Banned user', `${user.username} with ID: ${message.author.id}`)
                    .addField('Reason', "Spamming")
                    .setTimestamp(new Date())
                banChannel.send(banEmbed)

            }).catch(err =>{
                message.reply("I was unable to ban the member")
                console.error(err)
            })
        }
    }

}