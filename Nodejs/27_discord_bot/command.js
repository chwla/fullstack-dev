require('dotenv').config();

const { REST, Routes} = require("discord.js");

const commands =  [
    {
        name: 'aaaaa',
        description: 'Replies with bbbbb',
    },
];

const rest = new REST({ version: "10"}).setToken(process.env.DISCORD_TOKEN);

(async()=>{
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands("1391063737099616386"), {body: commands});

        console.log("Successfully reloaded application (/) commands.");
    } catch(error){
        console.log(error);
    }
})();