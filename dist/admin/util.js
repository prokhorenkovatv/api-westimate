"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("models"));
async function authenticate(email, password) {
    const userRecord = await models_1.default.User.findOne({
        where: { email },
    });
    if (userRecord) {
        const matched = await bcrypt_1.default.compare(password, userRecord.password);
        if (matched) {
            return userRecord;
        }
    }
    return false;
}
exports.authenticate = authenticate;
