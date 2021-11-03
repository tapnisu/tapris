import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'invite',
	description: 'Generates an invite',
	run: async (client, interaction) => {
		const link: string = await client.generateInvite({
			scopes: ['bot', 'applications.commands'],
			permissions: [
				'KICK_MEMBERS',
				'BAN_MEMBERS',
				'PRIORITY_SPEAKER',
				'VIEW_CHANNEL',
				'SEND_MESSAGES',
				'MANAGE_MESSAGES',
				'ATTACH_FILES',
				'READ_MESSAGE_HISTORY',
				'CONNECT',
				'SPEAK',
				'USE_APPLICATION_COMMANDS',
				'MANAGE_THREADS',
				'SEND_MESSAGES_IN_THREADS'
			]
		})

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle('Click to invite')
			.setURL(link)

		return interaction.reply({ embeds: [Embed] })
	}
}
