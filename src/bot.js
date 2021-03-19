require('dotenv').config();

const { Client } = require('discord.js');
// client is the only class that will allow us to interact with discord api.

const client = new Client();
// client object which is an instance of the Client class.

const PREFIX = "$";
// set a prefix that would issue a command

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`)
})
// referenc the on method and pass in ready (name of event) and callback function for how to
// handle the event.

// client.on('message', (message) => {
//     if(message.author.bot === true) return;  
//     console.log(`${message.author.tag} sent ${message.content}`)
//     if (message.content === 'hello') {
//         //message.reply('hello there!')
//         message.channel.send('hello');
//     }
// })

client.on('message', (message) => {
    if(message.author.bot === true) return;
    if (message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content 
        //arr restructuring. 1st ele will be structure into CMD name & every ele after will be 
        // stored inside the args variables which is an arr. The spread operator is unpacking all those
        // eles in the arr.
            .trim()  // this will trim all the white spaces before and after
            .substring(PREFIX.length)
            .split(/\s+/) // this regular expression will match for pattern and get rid of white spaces
            
        if (CMD_NAME === 'kick'){ // this CMD is a moderator CMD
            //message.channel.send('kicked the user');
            if(message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permssin to use this command')
            if(args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick() // there is a hierarchy in discord. The bot can only kick members below it in settings
                .then((member) => message.channel.send(`${memeber} was kicked.`))
                .catch((err) => message.channel.send('I do not ahve permission :(') )
            } else {
                message.channel.send('That member was not found')
            }

        } 
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)
// this will log our bot in by passing the Bot Token.



