import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'mineskin',
	description: 'Get minecraft skin & UUID',
	aliases: [],
	run: async (client, message, args) => {
		try {
			let response = (
				await axios.get(
					`https://api.ashcon.app/mojang/v2/user/${args.join(' ')}`
				)
			).data

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(response.username)
				.setDescription(`UUID: ${response.uuid}`)
				.setImage(`${response.textures.skin.url}`)
				.setTimestamp()

			return message.channel.send({ embeds: [Embed] })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
