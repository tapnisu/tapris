import { EmbedBuilder } from "discord.js";
import { getGuild, updateGuild } from "../../db";

import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
	name: "changelang",
	description: "Change language for the bot",
	options: [
		{
			name: "lang",
			description: "Lang that I will use",
			choices: [
				{ name: "Russian", value: "ru" },
				{ name: "English", value: "en" }
			],
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		await interaction.deferReply();

		const lang = interaction.options.getString("lang");
		const guild = await getGuild(interaction.guildId);
		guild.lang = lang;
		await updateGuild(guild);

		const { changelang } = await getLocale(interaction.guildId);

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(changelang.success(guild.lang));

		return await interaction.followUp({
			embeds: [embed]
		});
	}
};
