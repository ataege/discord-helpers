import { Client as DjsClient, Collection } from "discord.js";
import { ClientOptions, ICommand, EventHandler, IService } from "..";
export declare class Client extends DjsClient {
    readonly config?: Record<string, any>;
    readonly commands: Collection<string, ICommand>;
    readonly events: Collection<string, EventHandler>;
    readonly logger?: any;
    readonly services?: IService[];
    private readonly commandsPath;
    private readonly eventsPath;
    constructor(options: ClientOptions);
    private loadCommands;
    private loadEvents;
    start(token: string): Promise<void>;
}
