import { Message, Client, RichEmbed } from "discord.js";
import * as admin from 'firebase-admin';

import Command from "../command";
import GBot from "../gbot";

const GetDocCommand = new Command();
const AddDocCommand = new Command();
const RmDocCommand = new Command();

// TODO: Use subCollections instead of an array of links.

// !docs
const GetDocCommandHandler = async (message: Message, gbot: GBot, params: Array<string>) => {
  const chanId = message.channel.id;
  await message.channel.startTyping();
  const channelConfig = await admin
    .firestore()
    .collection('docs')
    .doc(chanId)
    .get();

  if (channelConfig.exists) {
    const embed = new RichEmbed();
    const links: Array<string> = channelConfig.get('links');

    if (links) {
      links.forEach(l => embed.addField("Link", l));
      await message.channel.send(embed);
      return;
    }
  }

  await message.channel.send("Sorry! This channel doesn't have any documentation links available. Ask a @Moderator to add one.");
  await message.channel.stopTyping();
};

// !add-docs https://firebase.google.com/docs/
const AddDocCommandHandler = async (message: Message, gbot: GBot, params: Array<string>) => {
  const link = params[0];
  const chanId = message.channel.id;

  await message.channel.startTyping();

  const existingDoc = await admin
    .firestore()
    .collection('docs')
    .doc(chanId)
    .get();

  const existingLinks: Array<string> = existingDoc.get('links');
  params.forEach(l => existingLinks.push(l));

  const channelConfig = await admin
    .firestore()
    .collection('docs')
    .doc(chanId)
    .set({
      links: existingLinks
    });

  await message.channel.send("Thanks! Link is being added...");
  await message.channel.stopTyping();
};

const RmDocCommandHandler = async (message: Message, gbot: GBot) => {
  const chanId = message.channel.id;

  await message.channel.startTyping();

  const existingDoc = await admin
    .firestore()
    .collection('docs')
    .doc(chanId)
    .delete();

  await message.channel.send("Thanks! Link is being added...");
  await message.channel.stopTyping();
};


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

export {
  AddDocCommand,
  GetDocCommand,
  RmDocCommand
};