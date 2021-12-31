import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { KitsuResponseItem, KitsuResponse } from '../../Interfaces/Kitsu'
import axios from 'axios'

export const command: Command = {
	name: 'anime',
	description: 'Sends anime description and image',
	options: [
		{
			name: 'name',
			description: 'Name of anime',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const request = interaction.options.getString('name')

		const response: AxiosResponse = await axios.get(
			`https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(request)}`
		)

		const kitsuResponse: KitsuResponse = response.data as KitsuResponse

		if (kitsuResponse.data.length == 0)
			return interaction.reply({
				content: 'Anime not found! :no_entry_sign:',
				ephemeral: true
			})

		const anime: KitsuResponseItem = kitsuResponse.data[0]

		console.log(
			anime.attributes?.episodeCount != null
				? anime.attributes?.episodeCount?.toString()
				: 'Unkown'
		)

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`Name: ${anime.attributes?.canonicalTitle}`)
			.setDescription(anime.attributes?.description)
			.setImage(anime.attributes?.posterImage?.original)
			.addFields(
				{
					name: 'Rating',
					value: anime.attributes?.averageRating,
					inline: true
				},
				{
					name: 'Age rating',
					value:
						anime.attributes?.ageRatingGuide != null
							? anime.attributes?.ageRatingGuide?.toString()
							: 'Unkown',
					inline: true
				},
				{
					name: 'NSFW',
					value: anime.attributes?.nsfw?.toString(),
					inline: true
				},
				{
					name: 'Episode count',
					value:
						anime.attributes?.episodeCount != null
							? anime.attributes?.episodeCount?.toString()
							: 'Unkown',
					inline: true
				},
				{
					name: 'Episode length',
					value:
						anime.attributes?.episodeLength != null
							? anime.attributes?.episodeLength.toString()
							: 'Unkown',
					inline: true
				}
			)
			.setTimestamp(new Date(anime.attributes?.startDate))

		return interaction.reply({ embeds: [Embed] })
	}
}
