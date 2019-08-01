const Discord = require("discord.js")
const mongoose = require("mongoose")
const config = require('./config.json')
const Money = require('./models/money')
const Chat = require('./models/chatpoints')
const Guild = require('./models/prefix')
const fs = require('fs')
const fileprefix = require('./guild.json')
const olddata = fs.readFileSync('./guild.json', 'utf-8')
const data = JSON.parse(olddata)
const redis = require('redis')
const { NlpManager } = require('node-nlp');
//const trainnlp = require('./assets/data/data');
const trainnlp = require('./assets/data/data');
//const client = redis.createClient()

var bot = new Discord.Client()



let authors = []
let messageLog = []
let warned = []
let banse = new Set()

const talkRecently = new Set()

clever.setNick("session")

mongoose.connect(config.mongoDB, {useNewUrlParser: true}, err =>{
    if (err) return console.log(err)
    console.log("Connected to mongo")
})

function kelToFar(kel){
    kel = parseFloat(kel);
    return ((kel * (9/5)) - 459.67).toString();
  }
  
  //Emoji weather resolver
  function emoj(owi){
    if(owi == "01d" || owi == "01n"){ return ":sunny:"; }
    if(owi == "02d" || owi == "02n"){ return ":white_sun_small_cloud:"; }
    if(owi == "03d" || owi == "03n"){ return ":white_sun_cloud:"; }
    if(owi == "04d" || owi == "04n"){ return ":cloud:"; }
    if(owi == "09d" || owi == "09n"){ return ":cloud_rain:"; }
    if(owi == "10d" || owi == "10n"){ return ":white_sun_rain_cloud:"; }
    if(owi == "11d" || owi == "11n"){ return ":thunder_cloud_rain:"; }
    if(owi == "13d" || owi == "13n"){ return ":cloud_snow:"; }
    if(owi == "50d" || owi == "50n"){ return ":fog:"; } //This is a custom emoji, you would have to add your own
  }
  
  //Unix time to normal
  function realTime(unx){
    var mer = "AM";
    var date = new Date(unx*1000);
    var hours = date.getHours();
    if(hours > 12){
      hours = hours - 12;
      var mer = "PM";
    }
    var min = 0 + date.getMinutes();
    var sec = 0 + date.getSeconds();
    return hours+":"+min+":"+sec+" "+mer;
  }
  
  //Unix date to normal
  function realDate(unx){
    var mer = "AM";
    var date = new Date(unx*1000);
    var year = date.getFullYear();
    var mont = date.getMonth();
    var dow = date.getDay();
    var day = date.getDate();
    var hour = date.getHours();
    if(hour > 12){
      hour = hour - 12;
      var mer = "PM";
    }
    var min = 0 + date.getMinutes();
    var sec = 0 + date.getSeconds();
    function dowRes(num){
      if(num == 0){ return "Sunday" }
      if(num == 1){ return "Monday" }
      if(num == 2){ return "Tuesday" }
      if(num == 3){ return "Wendsday" }
      if(num == 4){ return "Thursday" }
      if(num == 5){ return "Friday" }
      if(num == 6){ return "Saturday" }
    }
    return hour+":"+min+":"+sec+" "+mer+" on "+dowRes(dow)+" the "+mont+" "+day+", "+year
  }

function generateExp(min, max){
    return Math.ceil(Math.random() * (max - min + 1))
}

function generatePoint(min, max){
    return Math.ceil(Math.random() * (max - min + 1))
}

bot.once("ready", function(){
    console.log("I am ready")
    bot.user.setActivity("google with polowis", {type: "PLAYING"})
    console.log(Date.now())
    console.log(Date.now() + 86400000)
})

bot.on("disconnect", function(){
    console.warn("I am disconnecting. attempting to reconnect")
})

bot.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find(ch => ch.name === "welcome")
    if(!channel) return;
    channel.send(`Welcome to the server ${member} `)
})

bot.on("guildMemberRemove", member =>{
    const channel = member.guild.channels.find(ch => ch.name === "goodbye")
    if(!channel) return;
    channel.send(`Hope you enjoyed your stay ${member}`)
})

bot.on('guildBanAdd', guild => {
    guild.fetchAuditLogs().then(logs => {
      const ser = logs.entries.first().executor;
      if(!bane[ser.id+guild.id]) bane[ser.id+guild.id] = {
        bans: 2
      }
      let boner = bane[ser.id+guild.id]
  banse.add(ser.id)
  boner.bans = Math.floor(boner.bans+1)
  setTimeout(() => {
    boner.bans = 2
    banse.delete(ser.id)
  },8000)
  
  if(boner.bans > 2) {
    let roles = guild.members.get(ser.id).roles.array()
  guild.members.get(ser.id).removeRoles(roles)
  }
  
      })
  
      fs.writeFile('./alpha.json', JSON.stringify(bane), (err) => {
  if (err) console.error(err);
  })
    
})



bot.on("guildCreate", guild =>{
    console.log(`new guild joined: ${guild.name} (id : ${guild.id}). This guild has ${guild.memberCount} members`)
    
   /* fs.writeFile('./guild.json', JSON.stringify({
        guild: guild.id,
        prefix: "$"
    }), err =>{
        if(err) {
            throw err
        }
    })*/
    Guild.findOne({
        serverID: guild.id
    }, (err, prefix) =>{
        if(err) console.error(err)
        if(!prefix){
            const newPrefix = new Guild({
                serverID: guild.id,
                prefix: '$'

            })
            newPrefix.save().catch(err => console.error(err))
        }
    })
})

bot.on("message", async message =>{
   /* const guildPrefix = data.filter(prefix => prefix.guild === message.guild.id)
    if(guildPrefix.length < 1){
        fs.writeFileSync('./guild.json', JSON.stringify({
            guild: message.guild.id,
            prefix: "$"
        }))
    }
    
    const prefix = guildPrefix[0].prefix */

    //let gprefix = ''
    if(message.channel.type == "dm") return
    Guild.findOne({
        serverID: message.guild.id
    }, (err, prefix) =>{
        if(err) console.error(err)
        if(!prefix){
            const newPrefix = new Guild({
                serverID: message.guild.id,
                prefix: '$'

            })
            newPrefix.save().catch(err => console.error(err))
            
        }
        
    })

    const gprefix = await Guild.findOne({serverID: message.guild.id}).exec()
    //console.log(gprefix.prefix)
    //console.log(gprefix)
    
    
    if(message.author.equals(bot.user)) return;
    const args = message.content.slice(gprefix.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    if(talkRecently.has(message.author.id)) return;
    talkRecently.add(message.author.id);
    setTimeout(()=>{
        talkRecently.delete(message.author.id)
    }, 2500)

    if(message.author.id !== bot.user.id){
    const now = Math.floor(Date.now())
    authors.push({
        'time': now,
        'author': message.author.id
    })

    messageLog.push({
        'message': message.content,
        'author': message.author.id
    })

    let messageMatch = 0;
    for (let i = 0; i < messageLog.length; i ++){
        if(messageLog[i].message == message.content && (messageLog[i].author == message.author.id) && (message.author.id !== bot.user.id)){
            messageMatch = messageMatch + 1

        } 

    }
    if(messageMatch >= 5 && !warned.includes(message.author.id)){
        warn(message, message.author.id)

        const minusCoins = generateExp(5, 30)
        Money.findOne({
            userID: message.author.id
        }, (err, money) =>{
            if(err) console.error(err)
            if(!money){
                const minusMoney = new Money({
                    userID: message.author.id,
                    money: 0,
                    timeluck: Date.now(),
                    timedaily: Date.now()
                })
                minusMoney.save().catch(err => console.error(err))
            }
            else{
                const result = money.money - minusCoins
                if(result < 1){
                    money.money = 0
                }
                else{
                    money.money = money.money - minusCoins
                }
                money.save().catch(err => console.error(err))
            }
        })

    }

    if(messageMatch >= 10 && warned.includes(message.author.id)){
        message.guild.ban(message.author.id)
        const banChannel = message.guild.channels.find('name', 'goodbye')
        if(!banChannel) return;

        const user = message.guild.members.get(message.author.id).user
        const banEmbed = new Discord.RichEmbed()
            .setTitle('Ban')
            .setColor(0xbc0000)
            .addField('Banned user', `${user.username} with ID: ${message.author.id}`)
            .addField('Reason', "Spamming")
            .setTimestamp(new Date())
        banChannel.send(banEmbed)
    }
    

    }

    if(command == "v2"){
    const threshold = 0.5;
    const nlpManager = new NlpManager({ languages: ['en'] });

    const line = args.join(' ')
    console.log(line)
    function say(msg) {
        // eslint-disable-next-line no-console
        message.channel.send(msg);
      }
    await trainnlp(nlpManager, say);
    const result = await nlpManager.process(line);
    let c = result.intent
    console.log(result.intent)
    let name = c.split(".")[0]
    console.log(name)
    if(name == 'commands'){
        try{
            let botcommand = c.split(".")[1]
            console.log(botcommand)
            let commandFile = require(`./commands/${botcommand}.js`)
            commandFile.run(bot, message, args)
        } catch(err){
            return
        }
    }
    
    const answer =
        result.score > threshold && result.answer
          ? result.answer
          : "Sorry, I don't understand";
      let sentiment = '';
      if (result.sentiment.score !== 0) {
        sentiment = `  ${result.sentiment.score > 0 ? ':)' : ':('}   (${
          result.sentiment.score
        })`;
      }
      say(` ${answer}${sentiment}`);
    }
    const swearWords = [" "]
   // if(message.content.indexOf(config.prefix) !== 0) return;
    const coin = generateExp(3, 20);
    console.log(`coin ${coin}`)

    const exp = generateExp(2, 20);
    console.log(`exp ${exp}`)

    const chat = generatePoint(10, 30)
    console.log(`chat points ${chat}`)

    Chat.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
        
    }, (err, points) =>{
        if(err) console.log(err)
        if(!points){
            const newPoints = new Chat({
                userID: message.author.id,
                serverID: message.guild.id,
                points: chat,
                message: 1
            })
            newPoints.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        else{
            points.message = points.message + 1
            points.points = points.points + chat
            points.save()
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
    })
    
    Money.findOne({
        userID: message.author.id

    }, (err, money) => {
        if(err) console.log(err)
        if(!money){
            const newMoney = new Money({
                userID: message.author.id,
                money: coin,
                exp : exp,
                level: 1,
                timeluck: Date.now(),
                timedaily: Date.now()

            })

            newMoney.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        else{
            money.money = money.money + coin
            money.exp = money.exp + exp
            const currentLevel = Math.floor(0.1 * Math.sqrt(money.exp))
            if(money.level < currentLevel){
                money.level = money.level + 1
                message.channel.send(`Congratulation! You have leveled up to level ${currentLevel}`)
            }
            money.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
    })

    function warn(message, userid){
        warned.push(message.author.id)
        message.channel.send(message.author.id + ' ' + 'Stop spamming')
    }

    try{
        let commandFile = require(`./commands/${command}.js`)
        commandFile.run(bot, message, args, config)
    } catch(err){
        return
    }
})

bot.login(config.token)

process.on('unhandledRejection', (err) =>{
    console.log(err)
})
