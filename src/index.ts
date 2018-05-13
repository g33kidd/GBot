import GBot from './gbot';
import Hook from './hook';
import * as Discord from 'discord.js';
import Command from './command';

import { getCommands } from './commands';
import { getHooks } from './hooks';

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