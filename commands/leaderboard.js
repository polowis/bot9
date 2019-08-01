const Discord = require("discord.js")
const Chat = require("../models/chatpoints")

const number = [':one:', ':two:', ':three:', ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":ten:"]

module.exports.run = async (bot, message, args) =>{
    msg = await message.channel.send("Proccessing your request... please wait")
     Chat.find({
        serverID: message.guild.id
    }).sort({ points: -1}).exec((err, result) =>{
        if(err) {
            message.channel.send("Sorry, an error has occured")
            console.log(err)
        }
        
        const firstEmbed = new Discord.RichEmbed()
                .setTitle("Top 10 active leaderboard")
                .setFooter("Chat points system", message.guild.iconURL)

        message.channel.send(firstEmbed)
        for(let i = 0; i < 10; i++){
            if(i > result.length - 1){
                break;
            }
            let order = 0
            const user = message.guild.members.get(result[i].userID).user

            

            const embed = new Discord.RichEmbed()
                .addField(`${number[order]} Username`, user.username, true)
                .addField('Total points', result[i].points, true)
                .addField("Number of message", result[i].message, true)
                .setColor("#DAA520")
                order++
            msg.delete()
            
            message.channel.send(embed)
        }
        
    })
    

    }