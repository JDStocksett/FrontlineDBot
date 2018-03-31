const Discord = require("discord.js");
//const logger = require('winston');
const botSettings = require("./settings.json");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    /*
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    }).catch(err => {
        console.log(err.stack);
    });
    console.log("Hello 2");
    */

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

    console.log(`Checking for user info`);
    
    if(command === `${prefix}userinfo`) {
        
        console.log("In user info");
        
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is the user's info")
            .setColor("#9B59B6")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("Created Date", `${message.author.createdAt}`)

        message.channel.send(embed);
        return;
    };
    
    console.log("About to check ping");
    
    if(command === `${prefix}ping` || command === `${prefix}Ping`) {
        console.log("Found ping");
        message.channel.send("Pong!");

        return;
    };
    
    console.log("Checking weather");
    
    if(command === `${prefix}weather`) {
        
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

    return;
    };

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