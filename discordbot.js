const { Client, GatewayIntentBits } = require('discord.js');

const botToken = 'MTIzNjI0NDYyMjQ3NzQ5NjMzMA.G3pbqf.tkRcWT0XAFZvVECvshnK9HhqLl0QueJTP2WRQs';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

function getRandomTime(minHour, maxHour) {
    const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
    const minute = Math.floor(Math.random() * 60);
    const meridian = hour >= 12 ? 'PM' : 'AM';
    return `${hour % 12}:${minute.toString().padStart(2, '0')} ${meridian}`;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', (message) => {
  const content = message.content.toLowerCase(); 
  console.log('Content:', content); 


  const isMentioned = message.mentions.has(client.user) || 
                       message.member?.nickname?.toLowerCase().includes(client.user.username.toLowerCase());

  if (isMentioned) {
      if (content.includes('kitne baje aayega')) {
          console.log('User typed:', content);
          message.reply(`Aaj main ${getRandomTime(22, 3)} ke beech aa jaunga.`);
      } else if (content.includes('kidhar')) {
          console.log('User typed:', content);
          message.reply('Main c10 ke bed pe hu. ');
      } else if (content.includes('rate')) {
          console.log('User typed:', content);
          message.reply('Sirji, mere services sirf 5 rupay ghante ke hain. ');
      } else if (content.includes('deepak') || content.includes('dpk')) {
          console.log('User typed:', content);
          message.reply('I love Deepak very much and I can\'t live without him! ');
      } else if (content.includes('ghar')) {
          console.log('User typed:', content);
          message.reply(`${message.author.username}, raste mein hi hun!`);  
      } else if (content.includes('kamal')) {
          console.log('User typed:', content);
          message.reply('kamal se better sexual favors koi nai de skta guaranteed hai buddy');  
      } else {
          console.log('Default case triggered:', content);
          message.reply('Han Bolo Sir! Kya chahiye? '); 
      }
  }
});


client.login(botToken)
    .catch(error => {
        console.error('Error logging in:', error);
    });
