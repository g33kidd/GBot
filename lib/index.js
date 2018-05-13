"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gbot_1 = require("./gbot");
const commands_1 = require("./commands");
const hooks_1 = require("./hooks");
const config = {
    token: process.env.BOT_TOKEN,
    prefix: "!"
};
const bot = new gbot_1.default(config.prefix, config.token, hooks_1.getHooks(), commands_1.getCommands());
//# sourceMappingURL=index.js.map