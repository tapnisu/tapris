import { Command } from "@Interfaces/index";
import { KitsuResponse, KitsuResponseItem } from "@Interfaces/Kitsu";
import getLocale from "@Locales/index";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

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

		const { animeLocale } = await getLocale(interaction.guildId);

		if (response.data.length == 0)
			return await interaction.reply({
				content: animeLocale.animeNotFound,
				ephemeral: true
			});

		await interaction.deferReply();

		const anime: KitsuResponseItem = response.data[0];

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(animeLocale.embedTitle(anime.attributes?.canonicalTitle))
			.setDescription(anime.attributes?.description)
			.setImage(anime.attributes?.posterImage?.original)
			.addFields([
				{
					name: animeLocale.averageRating,
					value: anime.attributes?.averageRating,
					inline: true
				},
				{
					name: animeLocale.ageRating,
					value:
						anime.attributes?.ageRatingGuide != null
							? anime.attributes?.ageRatingGuide?.toString()
							: animeLocale.unknown,
					inline: true
				},
				{
					name: animeLocale.nsfw,
					value: anime.attributes?.nsfw?.toString(),
					inline: true
				},
				{
					name: animeLocale.episodeCount,
					value:
						anime.attributes?.episodeCount != null
							? anime.attributes?.episodeCount?.toString()
							: animeLocale.unknown,
					inline: true
				},
				{
					name: animeLocale.episodeLength,
					value:
						anime.attributes?.episodeLength != null
							? anime.attributes?.episodeLength.toString()
							: animeLocale.unknown,
					inline: true
				}
			])
			.setTimestamp(new Date(anime.attributes?.startDate));

		return await interaction.followUp({ embeds: [Embed] });
	}
};
