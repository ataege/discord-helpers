import { ClientOptions as COptions } from "discord.js";
import { ICommand } from "./Command";
import { EventHandler } from "./EventHandler";

export interface ClientOptions extends COptions {
	logger: any;
	config: Record<string, any>;
	commandsPath: string;
	eventsPath: string;
	prefix: string;
}
