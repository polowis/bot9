const math = require('math.js')
const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{
    try{
        if(!args[0]) return message.reply('You need to support an equation');

        const embed = new Discord.RichEmbed()
        .setTitle('The answer is:')
        .setDescription(math.eval(args.join(' ')))
     }
     catch(err){
         message.reply('Error')
     }

}