import * as Discord from 'discord.js';
import GBot from './gbot';

export default class Hook {

  runner: Function;

  constructor(runner: Function) {
    this.runner = runner;
  }

  public async run(client: Discord.Client, bot: GBot) {
    await this.runner(client, bot);
  }

}