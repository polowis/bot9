const Discord = require('discord.js')

module.exports = {
    name: "8ball",
    description: "Answer a question, magic 8 ball style",
    usage: "<8ball> <question> ?",
    category: "fun"
}
module.exports.run = async(bot, message, args) =>{
    answer = [
        'It is certain',
        'It is decidely so',
        'Without a doubt',
        'Yes - Definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook, yes',
        'Signs point to yes',
        'Ask again later',
        'Better not to tell you now',
        'Cannot predict now',
        'Concentrate and ask me again',
        "Don't count on it",
        'My reply is no',
        "Very doubtful",
        "My sources say no",
        "Of course, no"
    ]
    if(!args[0]) return message.reply('Idiot,  you need to ask me a question')
    if(!message.content.endsWith("?")) return message.reply("That does not look like a question")

    let result = answer[Math.floor(Math.random() * answer.length)]
    const embed = new Discord.RichEmbed()
        .setTitle(result)
    
    message.channel.send(embed)
}