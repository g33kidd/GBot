import Command from "../command";
import { Message, Client } from "discord.js";
import GBot from "../gbot";

const TestCommand = new Command();
const TestCommandHandler = async (message: Message, gbot: GBot) => {
  await message.channel.send("this is just a test command!");
};

TestCommand
  .setSignature('test')
  .setDescription('This is just a test command!')
  .setParams(3)
  .setHandler(TestCommandHandler);

export default TestCommand;