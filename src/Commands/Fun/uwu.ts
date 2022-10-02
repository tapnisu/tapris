import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "uwu",
	description: "Get UwU text",
	options: [
		{
			name: "text",
			description: "Text to be more UwU",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		await interaction.deferReply();

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(
				interaction.options
					.getString("text")
					.replace(/r/gi, "w")
					.replace(/l/gi, "v")
					.replace(/o/gi, "u")
					.replace(/[рл]/gi, "в")
					.replace(/о/gi, "у")
					.replace(/с/gi, "сь")
					.replace(/п/gi, "пь")
					.replace(/д/gi, "ть")
			);

		return await interaction.followUp({ embeds: [Embed] });
	}
};
