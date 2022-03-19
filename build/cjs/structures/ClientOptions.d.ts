import { ClientOptions as COptions } from "discord.js";
export interface ClientOptions extends COptions {
    logger: any;
    config: Record<string, any>;
    commandsPath: string;
    eventsPath: string;
}
