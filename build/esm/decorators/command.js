import "reflect-metadata";
import { MetadataKeys } from "..";
export function Command() {
    return (target) => {
        Reflect.defineMetadata(MetadataKeys.Command, target.prototype, target.prototype);
    };
}
//# sourceMappingURL=command.js.map