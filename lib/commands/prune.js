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
// TODO: Implement Params..
const PruneCommand = new command_1.default();
const PruneCommandHandler = (message, gbot, params) => __awaiter(this, void 0, void 0, function* () {
    const amount = parseInt(params[0]) || 99;
    yield message.channel.send("Okay! If you wish...");
    const messages = yield message.channel.fetchMessages({ limit: amount });
    message.channel.bulkDelete(messages);
});
PruneCommand
    .setSignature('prune')
    .setDescription('Deletes all messages in a channel!')
    .setParams(1)
    .setModerator(true)
    .setHandler(PruneCommandHandler);
exports.default = PruneCommand;
//# sourceMappingURL=prune.js.map