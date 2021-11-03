import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { Datum, PokemontcgResponse } from '../../Interfaces/Pokemontcg'
import axios from 'axios'

export const command: Command = {
	name: 'tcgdex',
	description: 'Get pokemon card data TCG',
	options: [
		{
			name: 'name',
			description: 'Card name',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const name = interaction.options.getString('name')

		try {
			let response: AxiosResponse = await axios.get(
				`https://api.pokemontcg.io/v2/cards?q=name:${encodeURI(name)}`
			)

			response = response.data as PokemontcgResponse

			const data: Datum = response.data[0]

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(`${data.supertype}: ${data.name}`)
				.setDescription(`${data.set.series}: ${data.set.name}`)
				.setThumbnail(data.set.images.symbol)
				.addFields({
					name: 'Rarity',
					value: data.rarity,
					inline: true
				})
				.setImage(data.images.large)
				.setTimestamp(new Date(data.set.releaseDate))

			return interaction.reply({ embeds: [Embed] })
		} catch {
			return interaction.reply({
				content: 'Error :no_entry_sign:',
				ephemeral: true
			})
		}
	}
}
