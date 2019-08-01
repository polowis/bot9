const Discord = require("discord.js")
const Money = require("../models/money")

module.exports.run = async (bot, message, args) =>{
    Money.findOne({

        userID: message.author.id

    }, (err, money) => {
        if(err) console.log(err)
        if(!money){
            const newMoney = new Money({
                userID: message.author.id,
                money: 0
            })
            newMoney.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        const embed = new Discord.RichEmbed()
            .addField("You have" + money.money + " coins", true)
            .setColor("#000000")
        message.channel.send(embed)
    })
}