const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async(bot, message, args) =>{
    if(isNaN(args[0])) return message.channel.send("Please enter a valid month")
    if(isNaN(args[1])) return message.channel.send('Please enter a valid day')
    const month = parseInt(args[0])
    const day = parseInt(args[1])

    const date = month && day ? `/${month}/${day}` : ''
    console.log(date)
    try{
        const body = await fetch(`http://history.muffinlabs.com/date${date}`).then(res => res.json())
        const events = body.data.Events
        const event = events[Math.floor(Math.random() * events.length)]
        const embed = new Discord.RichEmbed()
            .setTitle(`On this day (${body.date})...`)
            .setColor(0x9797FF)
            .setURL(body.url)
            .setTimestamp()
            .setDescription(`${event.year}: ${event.text}`)
            .addField(`See more`, 
            event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '))
        return message.channel.send(embed)
        }catch(err){
            if(err.status === 404 || err.status === 500) return message.reply('Invalid date')
            return message.reply('Oh, no. An error has occured, try again later')
        }
}