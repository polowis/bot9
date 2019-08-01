const Discord = require("discord.js")
const Money = require("../models/money.js")

module.exports.run = async(bot, message, args) =>{

    msg = await message.channel.send("Please wait...")

    const flip = [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        5,
        5,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        7,
        7,
        7,
        8,
        10,
        13,
        10,
        15,
        15,
        30,
        50
    ]
    let result = flip[Math.floor(Math.random() * flip.length)]
    
    function convert(ms){
      var minutes = Math.floor(ms / 60000)
      return minutes;
    }

    Money.findOne({

        userID: message.author.id

    }, (err, money) => {
        if(err) console.log(err)
        if(!money){
            const newMoney = new Money({
                userID: message.author.id,
                money: 0,
                timeluck: Date.now()
            })
            newMoney.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        else{
            timeluck = Date.now() - money.timeluck 
            const newTime = money.timeluck + 14400000
            const toTheNextLuck = newTime - Date.now()
            if(timeluck < 14400000){
                message.channel.send(`Please wait for another ${convert(toTheNextLuck)} minutes`)
            }
            else{
                message.channel.send(`You got ${result} coins, not happy? try your luck next time`)
                money.timeluck = Date.now()
                money.money = money.money + result
                money.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
            }
        }
        msg.delete()
    })
}