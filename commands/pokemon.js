const Discord = require('discord.js')
const pokemon = require('../assets/json/pokemon.json')

module.exports.run = async(bot, message, args) =>{
    const rand = Math.floor(Math.random() * 802);
    const poke = rand > 0 ? rand : Math.floor(Math.random() * 802);
    const pokem = pokemon[poke];

    const embed = new Discord.RichEmbed()
      .setTitle("You have 15 seconds to guess ! Who's that Pokémon !")
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setImage(pokem.imageURL)
      .setColor(6192321);
    
    const msg = await message.channel.send({ embed });
    const filter = m => m.author.id === message.author.id;
    const attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1 });

    if (!attempts || !attempts.size) {
        msg.delete();
        return message.channel.send(`Idiot! You took too long to answer. It was ${pokem.name}.`);
      } 
    
    const answer = attempts.first().content.toLowerCase();  

    console.log(answer)
      
    if (answer === pokem.name.toLowerCase()) {
      await msg.edit({embed: null});
      return msg.channel.send(`Yatta! Well done, ${pokem.name} was correct.`);
    }
    await msg.edit({embed: null});
    return msg.channel.send(`Idiot! You answered incorrectly, It was **${pokem.name}.**`);
  } 
    
