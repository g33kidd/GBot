"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
class GBot {
    constructor(prefix, token, hooks = [], commands) {
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
    registerCommands(commands) {
        return new Map(commands.map(command => [command.signature, command]));
    }
    onReady() {
        this.onReadyHooks();
        console.log("Bot is ready!");
    }
    onMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot)
                return;
            if (message.content.startsWith(this.prefix)) {
                const cmd = message.content.substr(1).split(" ");
                const signature = cmd[0];
                const command = this.commands.get(signature);
                if (command) {
                    if (command.canRun(message.member)) {
                        if (command.params != 0) {
                            const params = cmd.join(" ").split(" ", command.params + 1).slice(1);
                            console.log(params);
                            yield command.run(message, this, params);
                        }
                        else {
                            yield command.run(message, this);
                        }
                    }
                    else {
                        // Just a fun example I guess? Idk...
                        message.channel.send("Oops! You don't have permission to do that!")
                            .then((msg) => {
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield message.delete();
                                yield msg.delete();
                            }), 3000);
                        });
                    }
                }
            }
        });
    }
    onMemberAdd(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = this.client.guilds.first();
            const role = guild.roles.find("name", "Community");
            yield member.addRole(role);
        });
    }
    onReadyHooks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hooks.forEach((hook) => __awaiter(this, void 0, void 0, function* () {
                // console.log(this.client.user);
                hook.run(this.client, this);
                // await hook.run(this.client, this);
            }));
        });
    }
}
exports.default = GBot;
//# sourceMappingURL=gbot.js.map