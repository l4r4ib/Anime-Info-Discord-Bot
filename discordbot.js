
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

const botToken = '-token-';
const aniListApiUrl = 'https://graphql.anilist.co';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    try {
   
        const mentionedBot = message.mentions.users.has(client.user.id);
        if (mentionedBot) {
         
            const animeName = message.content
                .replace(/<@!?(\d+)>/, '') 
                .trim();
            if (animeName) {
                const query = `
                    query ($search: String) {
                        Media(search: $search, type: ANIME) {
                            id
                            title {
                                romaji
                            }
                            description
                            averageScore
                        }
                    }
                `;
                const variables = {
                    search: animeName
                };
                const response = await axios.post(aniListApiUrl, {
                    query,
                    variables
                });
                const anime = response.data.data.Media;
                if (anime) {
                    message.reply(`Title: ${anime.title.romaji}\nSynopsis: ${anime.description}\nRating: ${anime.averageScore}`);
                } else {
                    message.reply('Anime not found! Please type the anime name correctly.');
                }
            } else {
                message.reply('Please provide the name of the anime.');
            }
        }
    } catch (error) {
        console.error('Error processing message:', error);
        message.reply(`An error occurred while processing your message: ${error.message}`);
    }
});

client.login(botToken)
    .catch(error => {
        console.error('Error logging in:', error);
    });
