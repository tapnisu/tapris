import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: '8ball',
	description: 'Test your luck',
	aliases: [],
	run: async (client, message, args) => {
		let response = (await axios.get('https://nekos.life/api/v2/8ball')).data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response.response)
			.setImage(response.url)

		return message.channel.send({ embeds: [Embed] })
	}
}
