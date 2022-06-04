import { Command } from '../../Interfaces'
import { MessageActionRow, MessageButton, EmbedBuilder } from 'discord.js'

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

		const row = new MessageActionRow().addComponents(
			new MessageButton().setURL(link).setLabel('Invite bot').setStyle('LINK')
		)

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle('Click button to invite')

		return interaction.reply({ embeds: [Embed], components: [row] })
	}
}
