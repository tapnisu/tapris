import { deleteGuild } from "@db/index";
import { Event } from "@Interfaces/index";
import { Guild } from "discord.js";

export const event: Event = {
	name: "guildDelete",
	run: async (client, guild: Guild) => {
		const date = new Date().toLocaleString("en-US", {
			day: "2-digit",
			year: "2-digit",
			month: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});

		deleteGuild(guild.id);

		console.log(`[${date}] Left ${guild.name} guild!`);
	}
};
