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
class Command {
    constructor(signature = "", description = "", moderator = false, runner = () => { }) {
        this.signature = signature;
        this.description = description;
        this.permissions = [];
        this.moderator = moderator;
        this.runner = runner;
    }
    run(message, gbot, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runner(message, gbot, params);
        });
    }
    canRun(member) {
        if (this.permissions.length > 0) {
            console.log('requires explicit permissions');
            if (member.hasPermission(this.permissions)) {
                console.log('member has permissions');
                return true;
            }
            else {
                console.log('member doesnt have permissions');
                return false;
            }
        }
        else if (this.moderator) {
            console.log('requires a moderator');
            if (member.roles.find("name", "Moderators")) {
                console.log('member has the role');
                return true;
            }
            else {
                console.log('member doesn have the role');
                return false;
            }
        }
        else {
            console.log('no other case matched, no rules set. public permission.');
            return true;
        }
    }
    setSignature(signature) {
        this.signature = signature;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setParams(params) {
        this.params = params;
        return this;
    }
    setModerator(modOnly) {
        this.moderator = modOnly;
        return this;
    }
    setPermissions(permissions) {
        this.permissions = permissions;
        return this;
    }
    setHandler(func = (message, client) => { }) {
        this.runner = func;
        return this;
    }
}
exports.default = Command;
//# sourceMappingURL=command.js.map