const Discord = require('discord.js')

module.exports.run = async(bot, message, args) =>{

    function reverse(str){
        if(!str || str.length < 2 || typeof str !== 'string'){
            return 'not valid'
        }

        const revArray = [];
        const length = str.length - 1;

        for( let i = length; i >= 0; i --){
            revArray.push(str[i])
        }
        return revArray.join('');
    }
    if(!args[0]) return message.channel.send('Please provide a string')
   // console.log(args.length)
  // if(args.length < 2) return message.channel.send('Not a valid string, make sure the number of charater is greater than 2')
    
    const req = args.join(' ')
    message.channel.send(reverse(req))
}