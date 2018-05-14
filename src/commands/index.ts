import Command from "../command";
import { Message, Client } from "discord.js";

import TestCommand from './test';
import PruneCommand from './prune';
import { SetDefaultRoleCommand } from "./roles";
import { AddDocCommand, GetDocCommand, RmDocCommand } from "./docs";

// TODO: Make it possible to set params like so:
// TODO: Named parameters basically, which would get put into an object for usage.
// Cmd
//   .setParams(['amount'])

export function getCommands(): Array<Command> {
  return [
    TestCommand,
    PruneCommand,
    SetDefaultRoleCommand,
    AddDocCommand,
    GetDocCommand,
    RmDocCommand
  ];
};