"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
const prune_1 = require("./prune");
const roles_1 = require("./roles");
const docs_1 = require("./docs");
// TODO: Make it possible to set params like so:
// TODO: Named parameters basically, which would get put into an object for usage.
// Cmd
//   .setParams(['amount'])
function getCommands() {
    return [
        test_1.default,
        prune_1.default,
        roles_1.SetDefaultRoleCommand,
        docs_1.AddDocCommand,
        docs_1.GetDocCommand,
        docs_1.RmDocCommand
    ];
}
exports.getCommands = getCommands;
;
//# sourceMappingURL=index.js.map