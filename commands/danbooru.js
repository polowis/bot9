const Discord = require("discord.js")
const fetch = require("node-fetch")

const search = [
    'Searching the web, please wait...',
    'I am processing your request...',
    'Be patient',
    'Checking out..',
    'Generating image..'
    
]

const nsfw = [
    'You are not in nsfw channel',
    'Are you legal to view adult content?',
    'Idiot!, I cannot display the image in sfw channel',
    'Please join nsfw to use this feature',
    'Is there a rule saying that you cannot display nsfw content here?'
]

module.exports.run = async(bot, message, args) => {
    function getRating(rating){
        if(rating === "s") return "safe"
        if(rating ==="q") return "questionable"
        if(rating === "e") return "explicit"
        if(rating === "u") return "unrated"
    }
    //if(!args[0]) return message.channel.send("You need to supply a search term")
    const blacklist = ["loli", "shota", "cub", "young", "guro", "gore"]
    const tags = args.join("_")
    const msg = await message.channel.send(search[Math.floor(Math.random() * search.length)])
    if(!message.channel.nsfw) return message.channel.send(nsfw[Math.floor(Math.random * nsfw.length)])

    const  body  = await fetch(`http://danbooru.donmai.us/posts.json?${tags}&random=true`).then(res => res.json())
    const result = body[0]
    console.log(result)
    if(!result) return msg.edit(`No result found for ${tags}`)
    const tagString = result.tag_string.split(" ")
    if(tagString.length !== 0){
        if(tagString.some(t => blacklist.includes(t.toLowerCase()))) return msg.edit(` blacklist word found in result, aborting.. ${message.author}`)

    }
    msg.delete()
    const embed = new Discord.RichEmbed()
        .setTitle("Click here if the image failed to load")
        .setURL(`http://danbooru.donmai.us/post/show/${result.id}`)
        .setColor(6192321)
        .setImage(`${result.file_url}`)
        .setFooter(`Score: ${result.score} Rating: ${getRating(result.rating)}`)
    message.channel.send(embed)
    

}