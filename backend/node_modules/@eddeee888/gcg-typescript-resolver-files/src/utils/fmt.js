"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmt = void 0;
const preset_1 = require("../preset");
/**
 * Shared message formatter
 */
exports.fmt = {
    error: (input, type) => {
        return `[${preset_1.presetName}] ERROR: ${type} - ${input}`;
    },
    warn: (input) => {
        return `[${preset_1.presetName}] WARN: ${input}`;
    },
};
//# sourceMappingURL=fmt.js.map