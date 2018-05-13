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
const hook_1 = require("../hook");
const StatusHook = (client, bot) => __awaiter(this, void 0, void 0, function* () {
    client.user.setActivity("with Google");
});
const EnsureHasRolesHook = (client, bot) => __awaiter(this, void 0, void 0, function* () {
    const guild = client.guilds.first();
    const role = guild.roles.find("name", "Community");
    guild.members.forEach((member) => __awaiter(this, void 0, void 0, function* () {
        if (!member.user.bot) {
            try {
                yield member.addRole(role);
            }
            catch (e) {
                console.log(e);
            }
        }
    }));
});
const hookFunctions = [
    StatusHook,
    EnsureHasRolesHook
];
function getHooks() {
    return hookFunctions.map(h => new hook_1.default(h));
}
exports.getHooks = getHooks;
;
//# sourceMappingURL=index.js.map