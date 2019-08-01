const kitsu = require('kitsu')
const { Collection } = require("discord.js")

const Kitsu = new kitsu()

module.exports = {
    name: "anime",
    description: "Get anime information",
    usage: "anime <animeName>",
    category : "fun"
}

module.exports.run = async (bot, message, args) =>{
    function filter(msg){
        if(msg.author.id !== message.author.id) return false;
        return ["1", "2", "3", "4", "5"].includes(msg.content)
    }
    if(!args[0]){ 
        return message.channel.send("You must add an anime to search for")
}
const request = args.join("-")
    let msg = await message.channel.send("Processing your request... please wait")
    try {
        const {data} = await Kitsu.fetch("anime", {filter: {text: request}})
        console.log(data)
        if(data.length < 1) {
        return msg.edit(`No result found for ${request}`)
        }
        msg = await msg.edit(`Okay, I found 5 possible matches, which one do you want to see \n Please write the number of the one you want to see \n cancel in 30 seconds...${makeTitles(data)}`)
        const collected = await message.channel.awaitMessages(filter, {max: 20, maxProcessed: 1, time: 30000, error: ["time"]})
        const returnMessage = collected.first()
        const index = Number(returnMessage.content) - 1;
        await msg.edit(`Title JP ${data[index].titles.en_jp} \n English Title ${data[index].titles.en} \n**Type:** ${data[index].subtype}\n**Start Date:** ${data[index].startDate}\n**End Date:** ${data[index].endDate || "in Progress"}\n**PopularityRank:** ${data[index].popularityRank}\n**Link:** <https://kitsu.io/manga/${data[index].id}>\n**Synopsis:** ${data[index].synopsis}`)

    } catch (error){
        if(error instanceof Collection) return message.reply("Command canceled due to the time")
        throw error;
    }
    function makeTitles(data){
        const arr = [];
        for(let i = 0; i < 5; i++){
            arr.push(`\n${i + 1}: ${makeTitle(i, data)}`)
            
        }
        return arr.join()
    }
    function makeTitle(index, data){
        const line1 = data[index].titles.en_jp ? data[index].titles.en_jp : " ";
        const line2 = data[index].titles.en ? `/${data[index].titles.en}` : " ";

        return `${line1}${line2}`
    }
}