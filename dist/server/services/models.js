"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaUpdate_1 = __importDefault(require("../utils/schemaUpdate"));
const attributes_default_1 = __importDefault(require("../config/attributes.default"));
const pluginUid = 'plugin::strapi-plugin-collection-tree';
exports.default = ({ strapi }) => ({
    getModels() {
        const { contentTypes } = strapi;
        const models = Object.keys(contentTypes)
            .filter((c) => c.match('api::'))
            .map(m => m.slice(m.lastIndexOf('.') + 1));
        return models;
    },
    async manageTreeFields(models) {
        var _a, _b;
        const settings = await ((_a = strapi.service(`${pluginUid}.settings`)) === null || _a === void 0 ? void 0 : _a.getSettings());
        (_b = strapi.service(`${pluginUid}.models`)) === null || _b === void 0 ? void 0 : _b.getModels().forEach((key) => {
            var _a, _b;
            if (settings.models.includes(key)) {
                (_a = strapi.service(`${pluginUid}.models`)) === null || _a === void 0 ? void 0 : _a.addTreeFields(key);
            }
            else {
                (_b = strapi.service(`${pluginUid}.models`)) === null || _b === void 0 ? void 0 : _b.removeTreeFields(key);
            }
        });
    },
    async addTreeFields(key) {
        var _a, _b;
        const settings = await ((_a = strapi.service(`${pluginUid}.settings`)) === null || _a === void 0 ? void 0 : _a.getSettings());
        Object.keys(attributes_default_1.default).forEach((field) => {
            if (attributes_default_1.default[field].target)
                attributes_default_1.default[field].target = `api::${key}.${key}`;
            (0, schemaUpdate_1.default)().addAttribute(key, settings.attributes[field], attributes_default_1.default[field]);
        });
        (_b = strapi.service(`${pluginUid}.models`)) === null || _b === void 0 ? void 0 : _b.recoverTree(key);
    },
    async removeTreeFields(key) {
        var _a;
        const settings = await ((_a = strapi.service(`${pluginUid}.settings`)) === null || _a === void 0 ? void 0 : _a.getSettings());
        Object.keys(attributes_default_1.default).forEach((field) => (0, schemaUpdate_1.default)().removeAttribute(key, settings.attributes[field]));
    },
    async recoverTree(key) {
        var _a;
        const settings = await ((_a = strapi.service(`${pluginUid}.settings`)) === null || _a === void 0 ? void 0 : _a.getSettings());
        const entries = await strapi.db.query(`api::${key}.${key}`).findMany({ select: ['id', settings.attributes["lft"]], where: {}, orderBy: { id: 'asc' } });
        let tree = 1;
        entries.forEach(async (entry) => {
            if (entry.lft === null || entry.lft === undefined) {
                strapi.db.query(`api::${key}.${key}`).update({
                    where: { id: entry.id, },
                    data: {
                        [settings.attributes["lft"]]: tree,
                        [settings.attributes["rght"]]: tree + 1
                    }
                });
                tree += 2;
            }
        });
    }
});