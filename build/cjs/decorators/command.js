"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
require("reflect-metadata");
const __1 = require("..");
function Command() {
    return (target) => {
        Reflect.defineMetadata(__1.MetadataKeys.Command, target.prototype, target.prototype);
    };
}
exports.Command = Command;
//# sourceMappingURL=command.js.map