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
const command_1 = require("../command");
const TestCommand = new command_1.default();
const TestCommandHandler = (message, gbot) => __awaiter(this, void 0, void 0, function* () {
    yield message.channel.send("this is just a test command!");
});
TestCommand
    .setSignature('test')
    .setDescription('This is just a test command!')
    .setParams(3)
    .setHandler(TestCommandHandler);
exports.default = TestCommand;
//# sourceMappingURL=test.js.map