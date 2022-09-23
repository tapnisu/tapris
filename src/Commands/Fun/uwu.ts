import { Command } from "@Interfaces/index";
import { UwuResponse } from "@Interfaces/Nekoslife";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

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

		const text = interaction.options.getString("text");

		const response: UwuResponse = (
			await axios.get(
				`https://nekos.life/api/v2/owoify?text=${encodeURI(text)}`
			)
		).data;

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response.owo);

		return await interaction.followUp({ embeds: [Embed] });
	}
};
