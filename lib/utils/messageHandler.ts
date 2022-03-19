import { Message } from "discord.js";
import { Client, CommandType } from "../structures";

export function messageHandler(client: Client, message: Message) {
	const { commands, config } = client;

	if (!message.content.startsWith(client.prefix)) return;

	const commandName = message.content.split(" ")[0]!.slice(1).toLowerCase();
	const command =
    commands.get(commandName) ??
    // @ts-ignore
    commands.find((c) => c.aliases?.includes(commandName)) ??
    null;

	if (!command) {
		if (client.config?.invalidCommandMessage) {
			message.channel.send("**Geçersiz komut!**").then((m) => {
				setTimeout(() => {
					message.delete();
					m.delete();
				}, 3000);
			});
			return;
		} else return;
	}

	if (command.type !== CommandType.Simple) return;

	const member = message.guild?.members.cache.find(
		(m) => m.id == message.author.id
	);

	const args = message.content.split(" ").slice(1);

	if (
		command.permissions &&
		!command.permissions.some((permission) =>
			member!.permissions.has(permission)
		)
	)
		return;

	if (command.roles && !member!.roles.cache.hasAny(...command.roles)) return;

	if (
		command.channels &&
		!command.channels.some((channel) => message.channelId == channel)
	) {
		message.channel.send(
			`Bu komudu bu kanalda kullanamazsın. Kullanabileceğin kanallar: <#${command.channels.join(
				">, <#"
			)}>`
		);
		return;
	}

	if (command.requiredArgs && args.length < command.requiredArgs.length) {
		message.channel.send(
			`Eksik parametreler var. Göndermeniz gereken parametreler: **${command.requiredArgs.join(
				"**, **"
			)}**`
		);
		return;
	}

	command.execute(client, message, args);
}
