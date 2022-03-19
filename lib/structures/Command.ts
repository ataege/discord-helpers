import { Client } from ".";
import { Message, PermissionString, Snowflake } from "discord.js";

export interface ICommand {
	name: string;
	description: string;
	usage: string;
	category: CommandCategory;
	type: CommandType;
	aliases?: string[];
	permissions?: PermissionString[];
	roles?: Snowflake[];
	channels?: Snowflake[];
	requiredArgs?: string[];

	execute(
		client: Client,
		message: Message,
		args: string[]
	): any | Promise<any>
}

export type CommandData = {
	name: string;
	description: string;
	usage: string;
	roles?: Snowflake[];
	channels?: Snowflake[];
	permissions?: PermissionString[];
};

export enum CommandType {
	Simple = "simple",
	// Slash = "slash",
}

export enum CommandCategory {
	General = "general",
	Other = "other"
}