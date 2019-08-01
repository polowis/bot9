const Discord = require('discord.js')
const config = require('../config.json')
const fetch = require('node-fetch')

module.exports.run = async(bot, message, args) =>{
    const apikey = config.weatherAPI;
    if(!agrs[0]) return message.channel.send('I need a city name to check :wink:')
    const query = args.join(' ')
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apikey}`).then(res => res.json())
}