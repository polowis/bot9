const Discord = require('discord.js')
const Money = require('../models/money')

module.exports = {
    name: "daily",
    description: "Get your daily rewards up to 50 coins",
    usage: "daily",
    category: 'economy'
}

module.exports.run = async (bot, message, args) =>{

    dailyMoney = [
        10,
        20,
        30, 
        40,
        50
    ]

    function convert(ms){
        var minutes = Math.floor(ms / 60000)
        return minutes;
      }

    let result = dailyMoney[Math.floor(Math.random() * dailyMoney.length)]

    Money.findOne({
        userID: message.author.id
    }, (err, money) =>{
        if(err) console.error(err)
        if(!money) {
            const newMoney = new Money({
                userID: message.author.id,
                money: 0,
                timedaily: Date.now(),
                timeluck: Date.now()
            })
            newMoney.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))

        }
        else{
            timedaily = Date.now() - money.timedaily
            const newTime = money.timedaily + 86400000
            const toTheNextDaily = newTime - Date.now()
            if(timedaily < 86400000){
                message.channel.send(`Please wait for another ${convert(toTheNextDaily)} minutes to claim your daily rewards`)
            }
            else{
                message.channel.send(`You got ${result} coins!`)
                money.timedaily = Date.now()
                money.money = money.money + result
                money.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
            }
        }
    })

}