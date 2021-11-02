import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'invite',
	description: 'Generates an invite',
	run: async (client, interaction) => {
		const link: string = await client.generateInvite({
			scopes: ['bot', 'applications.commands']
		})

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle('Click to invite')
			.setURL(link)

		return interaction.reply({ embeds: [Embed] })
	}
}
