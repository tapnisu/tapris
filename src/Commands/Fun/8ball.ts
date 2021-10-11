import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { Response8ball } from '../../Interfaces/Nekoslife'
import axios from 'axios'

export const command: Command = {
	name: '8ball',
	description: 'Test your luck',
	aliases: [],
	run: async (client, message, args) => {
		var response: Response8ball = (
			await axios.get('https://nekos.life/api/v2/8ball')
		).data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response.response)
			.setImage(response.url)

		return message.channel.send({ embeds: [Embed] })
	}
}
