import Command from "../command";
import { Message, Client } from "discord.js";
import GBot from "../gbot";

// TODO: Implement Params..

const PruneCommand = new Command();
const PruneCommandHandler = async (message: Message, gbot: GBot, params: Array<string>) => {
  const amount = parseInt(params[0]) || 99;
  await message.channel.send("Okay! If you wish...");
  const messages = await message.channel.fetchMessages({ limit: amount });
  message.channel.bulkDelete(messages);
};

PruneCommand
  .setSignature('prune')
  .setDescription('Deletes all messages in a channel!')
  .setParams(1)
  .setModerator(true)
  .setHandler(PruneCommandHandler);

export default PruneCommand;