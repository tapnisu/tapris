import { Command } from "../../Interfaces";
import { SearchResult } from "../../Interfaces/Manga";
import axios from "axios";

import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

export const command: Command = {
	name: "manga",
	description: "Get data about manga",
	options: [
		{
			name: "query",
			description: "Query for search",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const query = interaction.options.getString("query");

		const response: SearchResult[] = (
			await axios.get(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
		).data;

		if (response.length == 0) {
			return interaction.reply({
				content: "Sorry! Manga not found! :(",
				ephemeral: true
			});
		}

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response[0].name)
			.addFields({
				name: "Last chapter",
				value: response[0].lastChapter,
				inline: true
			})
			.setImage(response[0].thumbnail)
			.setURL(response[0].url)
			.setAuthor({ name: response[0].author });

		const buttonsRow = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setURL(response[0].url)
				.setLabel("Read manga")
				.setStyle(ButtonStyle.Link)
		]);

		return interaction.reply({ embeds: [embed], components: [buttonsRow] });
	}
};
