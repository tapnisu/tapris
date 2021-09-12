import { Command } from '../../Interfaces'
import { MessageEmbed, ColorResolvable } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'anime',
	description: 'Sends anime description and image',
	aliases: ['name'],
	run: async (client, message, args) => {
		try {
			let response = await (
				await axios.get(
					`https://kitsu.io/api/edge/anime?filter[text]=${args.join('%20')}`
				)
			).data

			if (response.data.length == 0)
				return message.channel.send('Error :no_entry_sign:')

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(`Name: ${response.data[0].attributes.canonicalTitle}`)
				.setDescription(response.data[0].attributes.description)
				.setImage(response.data[0].attributes.posterImage.original)
				.addFields(
					{
						name: 'Rating',
						value: response.data[0].attributes.averageRating,
						inline: true
					},
					{
						name: 'Age rating',
						value: response.data[0].attributes.ageRatingGuide,
						inline: true
					},
					{
						name: 'NSFW',
						value: response.data[0].attributes.nsfw.toString(),
						inline: true
					},
					{
						name: 'Episode count',
						value: response.data[0].attributes.episodeCount.toString(),
						inline: true
					},
					{
						name: 'Episode length',
						value: response.data[0].attributes.episodeLength.toString(),
						inline: true
					},
					{
						name: 'Start date',
						value: response.data[0].attributes.startDate,
						inline: true
					}
				)

			return message.channel.send({ embeds: [Embed] })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
