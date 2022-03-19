import { Client } from ".";
import { ClientEvents } from "discord.js";
export interface EventHandler {
    event: string;
    description: string;
    listener(client: Client, ...args: ClientEvents[keyof ClientEvents]): void | Promise<void>;
}
