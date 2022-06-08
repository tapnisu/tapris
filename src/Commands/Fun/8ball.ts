import { Command } from '../../Interfaces'
import { EmbedBuilder } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { Response8ball } from '../../Interfaces/Nekoslife'
import axios from 'axios'

export const command: Command = {
	name: '8ball',
	description: 'Test your luck',
	run: async (client, interaction) => {
		const response: AxiosResponse = await axios.get(
			'https://nekos.life/api/v2/8ball'
		)

		const response8ball: Response8ball = response.data

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response8ball.response)
			.setImage(response8ball.url)

		return interaction.reply({ embeds: [Embed] })
	}
}
