import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { Response8ball } from '../../Interfaces/Nekoslife'
import axios from 'axios'

export const command: Command = {
	name: '8ball',
	description: 'Test your luck',
	aliases: [],
	run: async (client, message, args) => {
		const response: AxiosResponse = await axios.get(
			`https://nekos.life/api/v2/8ball?text=${encodeURI(args.join(' '))}}`
		)

		const response8ball: Response8ball = response.data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response8ball.response)
			.setImage(response8ball.url)

		return message.channel.send({ embeds: [Embed] })
	}
}
