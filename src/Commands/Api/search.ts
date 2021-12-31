import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { DuckduckgoResponse } from '../../Interfaces/Duckduckgo'
import axios from 'axios'
import { AxiosResponse } from '../../Interfaces/Axios'

export const command: Command = {
	name: 'search',
	description: 'Get wikipedia data',
	options: [
		{
			name: 'text',
			description: 'Text to be searched',
			type: 'STRING',
			required: true
		}
	],
	run: async (client, interaction) => {
		const text = interaction.options.getString('text')

		const response: AxiosResponse = await axios.get(
			`https://api.duckduckgo.com/?q=${encodeURI(text)}&format=json`
		)

		const responseData: DuckduckgoResponse = response.data

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`Имя: ${responseData?.Heading}`)
			.setURL(responseData?.AbstractURL)
			.setDescription(responseData?.Abstract)
			.setThumbnail(`https://api.duckduckgo.com/${responseData?.Image}`)

		return interaction.reply({ embeds: [Embed] })
	}
}
