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
const command_1 = require("../command");
const SetDefaultRoleCommand = new command_1.default();
exports.SetDefaultRoleCommand = SetDefaultRoleCommand;
const SetDefaultRoleCommandHandler = (message, gbot, params) => __awaiter(this, void 0, void 0, function* () {
    let role = gbot
        .client
        .guilds
        .first()
        .roles
        .find("name", params[0]);
    if (role) {
    }
    yield message.channel.send(`You gave me: ${params[0]}`);
    // await message.channel.send("Okay! If you wish...");
    // const messages = await message.channel.fetchMessages({ limit: 99 });
    // message.channel.bulkDelete(messages);
    // console.log("finished!");
});
SetDefaultRoleCommand
    .setSignature('set-default-role')
    .setDescription('Sets the default role for new users.')
    .setParams(1)
    .setModerator(true)
    .setHandler(SetDefaultRoleCommandHandler);
//# sourceMappingURL=roles.js.map