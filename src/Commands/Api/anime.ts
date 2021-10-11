import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { KitsuResponseItem } from '../../Interfaces/Kitsu'
import axios from 'axios'

export const command: Command = {
	name: 'anime',
	description: 'Sends anime description and image',
	aliases: ['name'],
	run: async (client, message, args) => {
		if (args.length == 0)
			return message.channel.send(
				'You did not supply enough arguments :no_entry_sign:'
			)

		var response: any = await axios.get(
			`https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(
				args.join(' ')
			)}`
		)

		if (response.data.data.length == 0)
			return message.channel.send('Anime not found! :no_entry_sign:')

		var anime: KitsuResponseItem = response.data.data[0]

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(`Name: ${anime.attributes.canonicalTitle}`)
			.setDescription(anime.attributes.description)
			.setImage(anime.attributes.posterImage.original)
			.addFields(
				{
					name: 'Rating',
					value: anime.attributes.averageRating,
					inline: true
				},
				{
					name: 'Age rating',
					value: anime.attributes.ageRatingGuide,
					inline: true
				},
				{
					name: 'NSFW',
					value: anime.attributes.nsfw.toString(),
					inline: true
				},
				{
					name: 'Episode count',
					value: anime.attributes.episodeCount.toString(),
					inline: true
				},
				{
					name: 'Episode length',
					value: anime.attributes.episodeLength.toString(),
					inline: true
				}
			)
			.setTimestamp(new Date(anime.attributes.startDate))

		return message.channel.send({ embeds: [Embed] })
	}
}
