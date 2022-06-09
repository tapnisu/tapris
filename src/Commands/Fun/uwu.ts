import { Command } from '../../Interfaces'
import { EmbedBuilder } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { UwuResponse } from '../../Interfaces/Nekoslife'
import axios from 'axios'

export const command: Command = {
	name: 'uwu',
	description: 'Get UwU text',
	options: [
		{
			name: 'text',
			description: 'Text to be more UwU',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const text = interaction.options.getString('text')

		const response: AxiosResponse = await axios.get(
			`https://nekos.life/api/v2/owoify?text=${encodeURI(text)}`
		)

		const uwuResponse: UwuResponse = response.data

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(uwuResponse.owo)

		return interaction.reply({ embeds: [Embed] })
	}
}
