"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ReactIntlCollector {
    constructor() {
        this.translations = {};
        this.locale = undefined;
        this.dir = undefined;
    }
    setDefaultLocale(locale) {
        this.locale = locale;
    }
    setTargetDir(dir) {
        this.dir = dir;
    }
    collectTranslationPair(id, value) {
        if (id in this.translations) {
            if (this.translations[id] !== value) {
                return false;
            }
        }
        else {
            this.translations[id] = value;
        }
        return true;
    }
    flush() {
        if (this.dir) {
            const content = JSON.stringify(this.translations, null, 2);
            fs_1.default.writeFileSync(`${this.dir}/${this.locale}.json`, content);
        }
    }
}
exports.default = ReactIntlCollector;
//# sourceMappingURL=ReactIntlCollector.js.map