import * as locales from "../Locales";

import { Button, Command, Env, Event, Gun } from "../Interfaces";
import { Client, ClientOptions, Collection, IntentsBitField } from "discord.js";

import { Music } from "../Exports/music";
import env from "./env";
import { readdirSync } from "fs";

class ExtendedClient extends Client {
	public events: Collection<string, Event> = new Collection();
	public commands: Collection<string, Command> = new Collection();
	public buttons: Collection<string, Button> = new Collection();
	public locales = locales;
	public env: Env = env as unknown as Env;
	public music: Collection<string, Music> = new Collection();
	public gun: Gun = {
		drum: []
	};

	constructor(
		options: ClientOptions = {
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildVoiceStates,
				IntentsBitField.Flags.MessageContent,
				IntentsBitField.Flags.GuildBans,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.GuildPresences
			]
		}
	) {
		super(options);
	}

	public async init() {
		this.login(this.env.TOKEN);

		readdirSync("dist/Commands").forEach(async (dir) => {
			const commands = readdirSync(`dist/Commands/${dir}`).filter((file) =>
				file.endsWith(".js")
			);

			for (const file of commands) {
				const { command } = await import(
					`${__dirname}/../Commands/${dir}/${file}`
				);

				this.commands.set(command.name, command);
			}
		});

		readdirSync("dist/Events")
			.filter((file) => file.endsWith(".js"))
			.forEach(async (file) => {
				const { event } = await import(`../Events/${file}`);
				this.events.set(event.name, event);
				this.on(event.name, event.run.bind(null, this));
			});

		readdirSync("dist/Buttons")
			.filter((file) => file.endsWith(".js"))
			.forEach(async (file) => {
				const { button } = await import(`${__dirname}/../Buttons/${file}`);

				this.buttons.set(button.customId, button);
			});
	}
}

export default ExtendedClient;
