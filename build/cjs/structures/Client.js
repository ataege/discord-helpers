"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = require("discord.js");
const glob_1 = require("glob");
class Client extends discord_js_1.Client {
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
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.logger = options.logger;
        this.config = options.config;
    }
    loadCommands() {
        (0, glob_1.glob)(this.commandsPath, (err, files) => {
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
exports.Client = Client;
//# sourceMappingURL=Client.js.map