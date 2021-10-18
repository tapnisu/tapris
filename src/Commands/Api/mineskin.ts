import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { AshconResponse } from '../../Interfaces/Ashcon'
import axios from 'axios'

export const command: Command = {
	name: 'mineskin',
	description: 'Get minecraft skin & UUID',
	aliases: [],
	run: async (client, message, args) => {
		try {
			const response: AxiosResponse = await axios.get(
				`https://api.ashcon.app/mojang/v2/user/${encodeURI(args.join(' '))}`
			)

			const user: AshconResponse = response.data

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(user.username)
				.setDescription(`UUID: ${user.uuid}`)
				.setImage(`${user.textures.skin.url}`)
				.setTimestamp()

			return message.channel.send({ embeds: [Embed] })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
