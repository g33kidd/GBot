import Command from "../command";
import { Message, Client, RoleData } from "discord.js";
import GBot from "../gbot";

const SetDefaultRoleCommand = new Command();
const SetDefaultRoleCommandHandler = async (
  message: Message,
  gbot: GBot,
  params: Array<string>
) => {
  let role = gbot
    .client
    .guilds
    .first()
    .roles
    .find("name", params[0])

  if (role) {

  }

  await message.channel.send(`You gave me: ${params[0]}`);
  // await message.channel.send("Okay! If you wish...");
  // const messages = await message.channel.fetchMessages({ limit: 99 });
  // message.channel.bulkDelete(messages);
  // console.log("finished!");
};

SetDefaultRoleCommand
  .setSignature('set-default-role')
  .setDescription('Sets the default role for new users.')
  .setParams(1)
  .setModerator(true)
  .setHandler(SetDefaultRoleCommandHandler);

export {
  SetDefaultRoleCommand
};