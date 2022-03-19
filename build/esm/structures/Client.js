import { Client as DjsClient, Collection } from "discord.js";
import { glob } from "glob";
export class Client extends DjsClient {
    config;
    commands;
    events;
    logger;
    services;
    commandsPath;
    eventsPath;
    constructor(options) {
        super(options);
        this.commandsPath = options.commandsPath;
        this.eventsPath = options.eventsPath;
        this.commands = new Collection();
        this.events = new Collection();
        this.logger = options.logger;
        this.config = options.config;
    }
    loadCommands() {
        glob(this.commandsPath, (err, files) => {
            if (err) {
                if (this.logger)
                    this.logger.error(err);
                return;
            }
            for (const file of files) {
                const required = require(file);
                const command = new required.default;
                this.commands.set(command.name, command);
            }
        });
    }
    loadEvents() { }
    async start(token) {
        this.loadCommands();
        this.loadEvents();
        this.login(token);
    }
}
//# sourceMappingURL=Client.js.map