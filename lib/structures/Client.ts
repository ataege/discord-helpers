import { Client as DjsClient, Collection } from "discord.js";
import { glob } from "glob";
import { ClientOptions, ICommand, EventHandler, IService } from "..";
import { messageHandler } from "../utils/messageHandler";

export class Client extends DjsClient {
	public readonly config?: Record<string, any>;
	public readonly commands!: Collection<string, ICommand>;
	public readonly events!: Collection<string, EventHandler>;
	public readonly logger?;
	public readonly services?: IService[];
	private readonly commandsPath: string;
	private readonly eventsPath: string;
	public readonly prefix: string;

	constructor(options: ClientOptions) {
		super(options);
		this.prefix = options.prefix;
		this.commandsPath = options.commandsPath;
		this.eventsPath = options.eventsPath;
		this.commands = new Collection<string, ICommand>();
		this.events = new Collection<string, EventHandler>();
		this.logger = options.logger;
		this.config = options.config;
	}

	private loadCommands() {
		glob(this.commandsPath, (err, matches) => {
			for (const match of matches) {
				const imprt = require(match);
				try {
					const command = new imprt.default() as ICommand;
					command.name = command.name.toLowerCase();
					this.commands.set(command.name, command);
					this.logger.info(
						`${command.name} initialized ${
							!command.aliases ? "" : `with aliases: ${command.aliases}`
						}`
					);
				} catch {}
			}
		});
	}

	private loadEvents() {
		this.on("messageCreate", messageHandler.bind(null, this));
		glob(this.eventsPath, (err, matches) => {
			for (const match of matches) {
				const imprt = require(match);
				const event: EventHandler = new imprt.default();
				// @ts-ignore
				this.on(event.event, event.listener.bind(null, this));
				this.events.set(event.event, event);
				this.logger.info(`${event.event} listening for ${event.description}`);
			}
		});
	}

	public async start(token: string) {
		this.loadCommands();
		this.loadEvents();
		this.login(token);
	}
}
