const Discord = require("discord.js")
const fetch = require("node-fetch")
const querystring = require("querystring")

module.exports.run = async (bot, message, args) =>{
    if(!args[0]){
        return message.channel.send("You need to supply a search term")
    }
    //const query = querystring.stringify({term: args.join(' ')});
    const question = args.join(' ')

    console.log(question)

    const  body  = await fetch(`https://api.urbandictionary.com/v0/define?term=${question}`).then(response => response.json())

    if(!body.list.length){
        return message.channel.send(`No results found for **${question}**`)
    }

    message.channel.send(body.list[0].definition)
    
}