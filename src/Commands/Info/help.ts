import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'help',
	description: 'Get info about commands',
	options: [
		{
			name: 'command',
			description: 'Name of command to get info',
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		const request = interaction.options.getString('command')
		const command = client.commands.get(request)

		if (command) {
			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(command.name)
				.setDescription(command.description)

			command.options.forEach((option) => {
				Embed.addFields({
					name: `${option.name}`,
					value: option.description ? option.description : 'none',
					inline: true
				})
			})

			return interaction.reply({ embeds: [Embed] })
		}

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(client.user.username)
			.setDescription(`Server member: ${interaction.guild.name}`)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

		client.commands.forEach((command) => {
			Embed.addFields({
				name: `/${command.name} ${
					command.options
						? command.options
							.map(
								(option) =>
									`<${option.required ? '' : ''}${option.name} [${
										option.description
									}]>`
							)
							.join(' ')
						: ''
				}`,
				value: command.description,
				inline: true
			})
		})

		return interaction.reply({ embeds: [Embed] })
	}
}
