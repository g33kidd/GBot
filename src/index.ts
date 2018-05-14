import * as Discord from 'discord.js';
import * as admin from 'firebase-admin';
import { get } from 'http';

import GBot from './gbot';
import Hook from './hook';
import Command from './command';
import { getCommands } from './commands';
import { getHooks } from './hooks';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: '',
    clientEmail: '',
    privateKey: ""
  }),
  databaseURL: 'https://<database>.firebaseio.com'
});

const config = {
  token: process.env.BOT_TOKEN,
  prefix: "!"
};

const bot = new GBot(
  config.prefix,
  config.token,
  getHooks(),
  getCommands()
);

// setTimeout(() => {
//   get('https://gbot-jzhpnsrrav.now.sh');
// }, 50000);