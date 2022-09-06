import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";
import { CatResponse } from "../../Interfaces/Nekoslife";

interface CatApiResponse {
	breeds: unknown[];
	id: string;
	url: string;
	width: number;
	height: number;
}

export const command: Command = {
	name: "cat",
	description: "Get cat text and photo",
	run: async (client, interaction) => {
		await interaction.deferReply();

		const nekosResponse: CatResponse = (
			await axios.get("https://nekos.life/api/v2/cat")
		).data;
		const catApiResponse: CatApiResponse = (
			await axios.get("https://api.thecatapi.com/v1/images/search")
		).data;

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(nekosResponse.cat)
			.setImage(catApiResponse[0].url);

		return await interaction.followUp({ embeds: [Embed] });
	}
};
