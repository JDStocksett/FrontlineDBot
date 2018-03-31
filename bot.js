const Discord = require("discord.js");
//const logger = require('winston');
const botSettings = require("./settings.json");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }

});

bot.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    
    console.log(`${messageArray[0]}|${messageArray[1]}`);
    
    if(!command.startsWith(prefix)) return;
    
    switch(command) {

        case `${prefix}userinfo`:            
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("This is the user's info")
                .setColor("#9B59B6")
                .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
                .addField("Created Date", `${message.author.createdAt}`)

            message.channel.send(embed);
            break;

        case `${prefix}ping`:
        case `${prefix}Ping`:
            console.log("Found ping");
            message.channel.send("Pong!");
            break;
        
        case `${prefix}weather`:
            console.log("Checking zip");
            
            let zipCode = messageArray[1];
            
            console.log(`Zip is ${zipCode}`);
            
            var request = require("request");

            var options = { method: 'GET',
              url: 'http://api.openweathermap.org/data/2.5/weather',
              qs: 
               { zip: `${zipCode},us`,
                 appid: 'c9b9747a481872999cf199acc6bec4ff',
                 units: 'imperial' }
                }

            console.log("Making request");

            request(options, function (error, response, body) {
              if (error) throw new Error(error);

              console.log(body);

              let jsonResponse = JSON.parse(body);

              message.channel.send(`The weather is currently ${jsonResponse.main.temp} degrees in ${jsonResponse.name}.`);
            })    
            break;

        case `${prefix}gifme`:
            let tag = message.content.substring(8,message.content.length);

            console.log(tag);

            var request = require("request");

            var options = { method: 'GET',
              url: 'http://api.giphy.com/v1/gifs/random',
              qs: { tag: `${tag}`, api_key: '33RGz8gaeEWlZBnitnrtjD261dzk5iyj' }
            }
              
            let msg = await message.channel.send("Generating...");

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                let jsonResponse = JSON.parse(body);
                let embedURL = jsonResponse.data.embed_url;
                let gifURL = jsonResponse.data.images.original.url;
                
                let msgEmbed = new Discord.RichEmbed()
                    .setURL(embedURL)
                    .setImage(gifURL)
                    .setTitle(`${message.author.username}'s ${tag} gif:`)

                try{
                    message.channel.send({embed: msgEmbed});
                } catch (e) {
                    console.log(e.stack);
                }
                    /*
                    try {
                        message.channel.send({embed:{
                            title:`Your ${tag} gif`,
                            url:`${embedURL}`,
                            image: {
                                "url": `${gifURL}`
                            
                        }}});
                    } catch(e) {
                       console.log(e.stack);
                    }
                    */
                msg.delete();
            });
            break;
        
    }
});


bot.login(botSettings.token);



/*
// console.log(auth.token)

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
*/