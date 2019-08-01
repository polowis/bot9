const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "catfact",
    description: "Generate a random fun fact about the cats",
    usage: "catfact",
    category: "fun"

}

module.exports.run = async(bot, message, args) =>{
    const msg = await message.channel.send('Processing your request...')
    const request = await fetch('https://catfact.ninja/fact').then(res => res.json())
    
    const embed = new Discord.RichEmbed()
        .setTitle('Cat fact')
        .setDescription(`${request.fact}`)
    message.channel.send(embed)
    msg.delete()

}