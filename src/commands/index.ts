import Command from "../command";
import { Message, Client } from "discord.js";

import TestCommand from './test';
import PruneCommand from './prune';
import { SetDefaultRoleCommand } from "./roles";

// TODO: Make it possible to set params like so:
// TODO: Named parameters basically, which would get put into an object for usage.
// Cmd
//   .setParams(['amount'])

export function getCommands(): Array<Command> {
  return [
    TestCommand,
    PruneCommand,
    SetDefaultRoleCommand
  ];
};