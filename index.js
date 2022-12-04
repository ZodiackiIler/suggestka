const { Intents } = require('discord.js');
const tdev = require('./Utils/tdev');
const client = new tdev({ intents: [Intents.ALL] }, { allowedMentions: { parse: ['users', 'roles'], repliedUser: false } });
client.start();
