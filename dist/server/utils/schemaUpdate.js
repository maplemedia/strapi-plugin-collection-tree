"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const getSchemaPath = (model) => {
    return `./src/api/${model}/content-types/${model}/schema.json`;
};
const getSchema = (model) => {
    return JSON.parse(fs.readFileSync(getSchemaPath(model)).toString());
};
const updateSchema = (model, data) => {
    fs.writeFileSync(getSchemaPath(model), JSON.stringify(data, null, 2));
};
exports.default = () => ({
    addAttribute(model, field, config) {
        let schema = getSchema(model);
        schema.attributes[field] = config;
        updateSchema(model, schema);
    },
    removeAttribute(model, attribute_key) {
        let schema = getSchema(model);
        delete schema.attributes[attribute_key];
        updateSchema(model, schema);
    }
});
