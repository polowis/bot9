const Discord = require('discord.js')
const say = require('say')

module.exports.run = async(bot, message, args) =>{
    if(message.channel.type !== 'text') return;

    const { voiceChannel } = message.member;
    
    if (!voiceChannel) {
        return message.reply('please join a voice channel first!');
    }

    voiceChannel.join().then(connection => {
        const dispatcher = connection.playStream(say.speak('I am an artificial intelligent bot created by Hung Tran. '));
        dispatcher.on('end', () => voiceChannel.leave())
})
}