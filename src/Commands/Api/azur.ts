import { Command } from '../../Interfaces'
import { EmbedBuilder } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { AzurResponse } from '../../Interfaces/Azur'
import axios from 'axios'

export const command: Command = {
	name: 'azur',
	description: 'Get data about Azur Lane',
	options: [
		{
			name: 'name',
			description: 'Name of ship',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const request = encodeURI(
			interaction.options['name'].toLowerCase()
		)

		let response: AxiosResponse

		try {
			response = await axios.get(
				`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
			)
		} catch {
			return interaction.reply({
				content: 'Ship not found :no_entry_sign:',
				ephemeral: true
			})
		}

		const ship: AzurResponse = response.data as AzurResponse

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(ship.name)
			.setURL(`https://azurlane.koumakan.jp/${request}`)
			.setDescription(ship.rarity)
			.addFields([
				{ name: 'ID', value: ship.ID, inline: true },
				{ name: 'Hull', value: ship.hull, inline: true },
				{ name: 'Navy', value: ship.navy, inline: true },
				{ name: 'Class', value: ship.class, inline: true },
				{ name: 'Voice acting', value: ship.voiceActress, inline: true }
			])

		return interaction.reply({ embeds: [Embed] })
	}
}
