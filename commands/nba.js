const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports.run = async (bot, message, args) =>{ 
    
    
    if(!args[0]) return message.channel.send('Please provide a player name to search')
    const year = new Date().getFullYear()
    console.log(year)
    let first = args[0]
    let last = args[1]
    const firstName = first.toLowerCase()
    const lastName = last.toLowerCase()
    
    //if(!args[0]) return message.channel.send('Please provide a player name to search')

    

    
    

    const msg = await message.channel.send('Proccessing your request, please wait.. \n this will take a while')

    const body = await fetch(`http://data.nba.net/10s/prod/v2/2019/players.json`).then(res => res.json())
    const data = body.league.standard;
    
    const players = data.filter(player => player.firstName.toLowerCase() === firstName && player.lastName.toLowerCase() === lastName)
    
    if(players.length < 1) return msg.edit("Sorry, no such player exists, please check your spelling")

       
            const playerId = players[0].personId;
            const teamId = players[0].teamId;
            //const teams = players[0].teams;
            const jersey = players[0].jersey;
            const position = players[0].pos;
            const feet = players[0].heightFeet;
            const meters = players[0].heightMeters;
            const pounds = players[0].weightPounds;
            const kg = players[0].weightKilograms;
            const birth = players[0].dateOfBirthUTC;
            const pick = players[0].draft.pickNum;
            const round = players[0].draft.roundNum;
            const collegeName = players[0].collegeName;
            const years = players[0].yearsPro;
            const country = players[0].country;

            

            const request = await fetch(`http://data.nba.net/prod/v1/2019/players/${playerId}_profile.json`).then(res => res.json())
           
           const career = request.league.standard.stats.careerSummary
           

            const ppg = career.ppg;
            
            const rpg = career.rpg;
            const apg = career.apg;
            const bpg = career.bpg;
            const mpg = career.mpg;
            const spg = career.spg;
            const points = career.points;
            const games = career.gamesPlayed;
            const assists = career.assists;
            const blocks = career.blocks;
            const steals = career.steals;
            const reb = career.totReb;

            const teamRequest = await fetch(`http://data.nba.net/prod/v2/2019/teams.json`).then(res => res.json())
            //console.log(teamRequest.league.standard)
            const teamsNBA = teamRequest.league.standard
            
            
            const currentTeam = teamsNBA.find(team => team.teamId === teamId).nickname;
            
            
            const firstEmbed = new Discord.RichEmbed()
            .setTitle(':basketball: NBA Player Stats')
            .setAuthor(`${players[0].firstName} ${players[0].lastName}`)
            .addField('Jersey Number', jersey, true)
            .addField('Position', `${position}`, true)
            .addField('Height', `${feet}Ft. / ${meters}m`, true)
            .addField('Weight', `${pounds}lb. / ${kg}kg`, true)
            .addField('Birth Date', birth, true)
         //   .addField('Draft', `${round} round ${pick}${(pick % 10 === 1) ? 'st' : (pick % 10 === 2) ? 'nd' : (pick % 10 === 3) ? 'rd' : 'th'} pick`, true)
            .addField('Current team', currentTeam, true)
            .addField('Years Pro', years, true)
            .addField('Country', country, true)
            //.addField('College', collegeName, true)
        
        const secondEmbed = new Discord.RichEmbed()
            .setTitle(':basketball_player: Carrer summary')
            .addField('ppg', ppg, true)
            .addField('rpg', rpg, true)
            .addField('apg', apg, true)
            .addField('bpg', bpg, true)
            .addField('mpg', mpg, true)
            .addField('spg', spg, true)
            .addField('Total points', points, true)
            .addField('Total game played', games, true)
            .addField('Total Rebounds', reb, true)
            .addField('Total assists', assists, true)
            .addField('Total blocks', blocks, true)
            .addField('Total steals', steals, true)
            .setFooter('NBA Player stats')
            .setTimestamp(new Date())
        
        msg.delete()
        message.channel.send(firstEmbed)
        message.channel.send(secondEmbed)
        
    
}