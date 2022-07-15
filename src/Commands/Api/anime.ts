import { KitsuResponse, KitsuResponseItem } from "../../Interfaces/Kitsu";

import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
	name: "anime",
	description: "Sends anime description and image",
	options: [
		{
			name: "name",
			description: "Name of anime",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const request = interaction.options.getString("name");

		const response: KitsuResponse = (
			await axios.get(
				`https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(request)}`
			)
		).data;

		if (response.data.length == 0)
			return await interaction.reply({
				content: "Anime not found! :no_entry_sign:",
				ephemeral: true
			});

		const anime: KitsuResponseItem = response.data[0];

		console.log(
			anime.attributes?.episodeCount != null
				? anime.attributes?.episodeCount?.toString()
				: "Unknown"
		);

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`Name: ${anime.attributes?.canonicalTitle}`)
			.setDescription(anime.attributes?.description)
			.setImage(anime.attributes?.posterImage?.original)
			.addFields([
				{
					name: "Rating",
					value: anime.attributes?.averageRating,
					inline: true
				},
				{
					name: "Age rating",
					value:
						anime.attributes?.ageRatingGuide != null
							? anime.attributes?.ageRatingGuide?.toString()
							: "Unknown",
					inline: true
				},
				{
					name: "NSFW",
					value: anime.attributes?.nsfw?.toString(),
					inline: true
				},
				{
					name: "Episode count",
					value:
						anime.attributes?.episodeCount != null
							? anime.attributes?.episodeCount?.toString()
							: "Unknown",
					inline: true
				},
				{
					name: "Episode length",
					value:
						anime.attributes?.episodeLength != null
							? anime.attributes?.episodeLength.toString()
							: "Unknown",
					inline: true
				}
			])
			.setTimestamp(new Date(anime.attributes?.startDate));

		return await interaction.reply({ embeds: [Embed] });
	}
};
