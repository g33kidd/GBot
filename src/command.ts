import * as Discord from 'discord.js';
import GBot from './gbot';

export default class Command {

  signature: string;
  description: string;
  moderator: boolean;
  params: number;
  permissions: Array<Discord.PermissionResolvable>;
  runner: Function;

  constructor(
    signature: string = "",
    description: string = "",
    moderator: boolean = false,
    runner: Function = () => { }
  ) {
    this.signature = signature;
    this.description = description;
    this.permissions = [];
    this.moderator = moderator;
    this.runner = runner;
  }

  async run(message: Discord.Message, gbot: GBot, params: Array<string> = []) {
    await this.runner(message, gbot, params);
  }

  public canRun(member: Discord.GuildMember): Boolean {
    if (this.permissions.length > 0) {
      console.log('requires explicit permissions');
      if (member.hasPermission(this.permissions)) {
        console.log('member has permissions');
        return true;
      } else {
        console.log('member doesnt have permissions');
        return false;
      }
    } else if (this.moderator) {
      console.log('requires a moderator');
      if (member.roles.find("name", "Moderators")) {
        console.log('member has the role');
        return true;
      } else {
        console.log('member doesn have the role');
        return false;
      }
    } else {
      console.log('no other case matched, no rules set. public permission.');
      return true;
    }
  }

  public setSignature(signature: string): Command {
    this.signature = signature;
    return this;
  }

  public setDescription(description: string): Command {
    this.description = description;
    return this;
  }

  public setParams(params: number): Command {
    this.params = params;
    return this;
  }

  public setModerator(modOnly: boolean): Command {
    this.moderator = modOnly;
    return this;
  }

  public setPermissions(permissions: Array<Discord.PermissionResolvable>): Command {
    this.permissions = permissions;
    return this;
  }

  public setHandler(func: Function = (message: Discord.Message, client: Discord.Client) => { }): Command {
    this.runner = func;
    return this;
  }

}