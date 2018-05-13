import Hook from "../hook";
import { Client } from "discord.js";
import GBot from "../gbot";

const StatusHook = async (client: Client, bot: GBot) => {
  client.user.setActivity("with Google");
};

const EnsureHasRolesHook = async (client: Client, bot: GBot) => {
  const guild = client.guilds.first()
  const role = guild.roles.find("name", "Community");
  guild.members.forEach(async member => {
    if (!member.user.bot) {
      try {
        await member.addRole(role);
      } catch (e) {
        console.log(e);
      }
    }
  });
};

const hookFunctions = [
  StatusHook,
  EnsureHasRolesHook
];

export function getHooks(): Array<Hook> {
  return hookFunctions.map(h => new Hook(h));
};