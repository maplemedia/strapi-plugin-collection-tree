"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __importDefault(require("./settings"));
const sort_1 = __importDefault(require("./sort"));
exports.default = {
    settingsController: settings_1.default,
    sortController: sort_1.default
};