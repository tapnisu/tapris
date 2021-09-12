import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'tcgdex',
	description: 'Get pokemon card data TCG',
	aliases: ['name'],
	run: async (client, message, args) => {
		try {
			let response = (
				await axios.get(
					`https://api.pokemontcg.io/v2/cards?q=name:${args
						.join('&%20')
						.toLowerCase()}`
				)
			).data

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(`${response.data[0].supertype}: ${response.data[0].name}`)
				.setDescription(
					`${response.data[0].set.series}: ${response.data[0].set.name}`
				)
				.setThumbnail(response.data[0].set.images.symbol)
				.addFields({
					name: 'Rarity',
					value: response.data[0].rarity,
					inline: true
				})
				.setImage(response.data[0].images.large)
				.setTimestamp(response.data[0].set.releaseDate)

			return message.channel.send({ embeds: [Embed] })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
