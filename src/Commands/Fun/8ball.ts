import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";

import { Response8ball } from "../../Interfaces/Nekoslife";
import axios from "axios";

export const command: Command = {
	name: "8ball",
	description: "Test your luck",
	run: async (client, interaction) => {
		const response: Response8ball = (
			await axios.get("https://nekos.life/api/v2/8ball")
		).data;

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response.response)
			.setImage(response.url);

		return interaction.reply({ embeds: [Embed] });
	}
};
