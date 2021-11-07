import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { AshconResponse } from '../../Interfaces/Ashcon'
import axios from 'axios'

export const command: Command = {
	name: 'mineskin',
	description: 'Get minecraft skin & UUID',
	options: [
		{
			name: 'nickname',
			description: 'Nickname of the user to be shown',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const nickname = interaction.options.getString('nickname')

		try {
			const response: AxiosResponse = await axios.get(
				`https://api.ashcon.app/mojang/v2/user/${encodeURI(nickname)}`
			)

			const user: AshconResponse = response.data

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(user.username)
				.setDescription(`UUID: ${user.uuid}`)
				.setImage(`${user.textures.skin.url}`)
				.setTimestamp()

			return interaction.reply({ embeds: [Embed] })
		} catch {
			return interaction.reply({
				content: 'User not found :no_entry_sign:',
				ephemeral: true
			})
		}
	}
}
