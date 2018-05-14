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
const discord_js_1 = require("discord.js");
const admin = require("firebase-admin");
const command_1 = require("../command");
const GetDocCommand = new command_1.default();
exports.GetDocCommand = GetDocCommand;
const AddDocCommand = new command_1.default();
exports.AddDocCommand = AddDocCommand;
const RmDocCommand = new command_1.default();
exports.RmDocCommand = RmDocCommand;
// TODO: Use subCollections instead of an array of links.
// !docs
const GetDocCommandHandler = (message, gbot, params) => __awaiter(this, void 0, void 0, function* () {
    const chanId = message.channel.id;
    yield message.channel.startTyping();
    const channelConfig = yield admin
        .firestore()
        .collection('docs')
        .doc(chanId)
        .get();
    if (channelConfig.exists) {
        const embed = new discord_js_1.RichEmbed();
        const links = channelConfig.get('links');
        if (links) {
            links.forEach(l => embed.addField("Link", l));
            yield message.channel.send(embed);
            return;
        }
    }
    yield message.channel.send("Sorry! This channel doesn't have any documentation links available. Ask a @Moderator to add one.");
    yield message.channel.stopTyping();
});
// !add-docs https://firebase.google.com/docs/
const AddDocCommandHandler = (message, gbot, params) => __awaiter(this, void 0, void 0, function* () {
    const link = params[0];
    const chanId = message.channel.id;
    yield message.channel.startTyping();
    const existingDoc = yield admin
        .firestore()
        .collection('docs')
        .doc(chanId)
        .get();
    const existingLinks = existingDoc.get('links');
    params.forEach(l => existingLinks.push(l));
    const channelConfig = yield admin
        .firestore()
        .collection('docs')
        .doc(chanId)
        .set({
        links: existingLinks
    });
    yield message.channel.send("Thanks! Link is being added...");
    yield message.channel.stopTyping();
});
const RmDocCommandHandler = (message, gbot) => __awaiter(this, void 0, void 0, function* () {
    const chanId = message.channel.id;
    yield message.channel.startTyping();
    const existingDoc = yield admin
        .firestore()
        .collection('docs')
        .doc(chanId)
        .delete();
    yield message.channel.send("Thanks! Link is being added...");
    yield message.channel.stopTyping();
});
AddDocCommand
    .setSignature('add-docs')
    .setDescription('Adds documentation links for a channel!')
    .setParams(1)
    .setModerator(true)
    .setHandler(AddDocCommandHandler);
GetDocCommand
    .setSignature('docs')
    .setDescription('Gets documentation links for this channel.')
    .setHandler(GetDocCommandHandler);
RmDocCommand
    .setSignature('rm-docs')
    .setDescription('Removes all documentation links from the channel.')
    .setModerator(true)
    .setHandler(RmDocCommandHandler);
//# sourceMappingURL=docs.js.map