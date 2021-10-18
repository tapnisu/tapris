import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { AzurResponse } from '../../Interfaces/Azur'
import axios from 'axios'

export const command: Command = {
	name: 'azur',
	description: 'Get data about Azur Lane',
	aliases: ['name'],
	run: async (client, message, args) => {
		const request = encodeURI(args.join('_').toLocaleLowerCase())

		let response: AxiosResponse

		try {
			response = await axios.get(
				`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
			)
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}

		const ship: AzurResponse = response.data as AzurResponse

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(ship.name)
			.setURL(`https://azurlane.koumakan.jp/${request}`)
			.setDescription(ship.rarity)
			.addFields(
				{ name: 'ID', value: ship.ID, inline: true },
				{ name: 'Hull', value: ship.hull, inline: true },
				{ name: 'Navy', value: ship.navy, inline: true },
				{ name: 'Class', value: ship.class, inline: true },
				{ name: 'Voice acting', value: ship.voiceActress, inline: true }
			)

		return message.channel.send({ embeds: [Embed] })
	}
}
