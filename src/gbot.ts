import * as Discord from 'discord.js';
import Hook from './hook';
import Command from './command';

export default class GBot {

  prefix: string;
  client: Discord.Client;
  hooks: Array<Hook>;
  commands: Map<string, Command>;
  test: Discord.Collection<string, Command>;

  constructor(
    prefix: string,
    token: string,
    hooks: Array<Hook> = [],
    commands: Array<Command>
  ) {
    this.client = new Discord.Client();
    this.prefix = prefix;
    this.hooks = hooks;

    this.setupEvents();
    this.commands = this.registerCommands(commands);

    this.client.login(token);
  }

  setupEvents() {
    this.client.on('ready', this.onReady.bind(this));
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('guildMemberAdd', this.onMemberAdd.bind(this));
  }

  registerCommands(commands: Array<Command>): Map<string, Command> {
    return new Map(
      commands.map(command =>
        [command.signature, command] as [string, Command])
    );
  }

  onReady() {
    this.onReadyHooks();
    console.log("Bot is ready!");
  }

  async onMessage(message: Discord.Message) {
    if (message.author.bot) return;
    if (message.content.startsWith(this.prefix)) {
      const cmd = message.content.substr(1).split(" ");
      const signature = cmd[0];
      const command = this.commands.get(signature);

      if (command) {
        if (command.canRun(message.member)) {
          if (command.params != 0) {
            const params = cmd.join(" ").split(" ", command.params + 1).slice(1);
            console.log(params);
            await command.run(message, this, params);
          } else {
            await command.run(message, this);
          }
        } else {
          // Just a fun example I guess? Idk...
          message.channel.send("Oops! You don't have permission to do that!")
            .then((msg: Discord.Message) => {
              setTimeout(async () => {
                await message.delete();
                await msg.delete();
              }, 3000);
            });
        }
      }

    }
  }

  async onMemberAdd(member: Discord.GuildMember) {
    const guild = this.client.guilds.first()
    const role = guild.roles.find("name", "Community");
    await member.addRole(role);
  }

  async onReadyHooks() {
    this.hooks.forEach(
      async hook => {
        // console.log(this.client.user);
        hook.run(this.client, this);
        // await hook.run(this.client, this);
      }
    );
  }
}