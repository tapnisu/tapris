import { Event } from '../Interfaces'
import {
	Guild,
	MessageEmbed,
	MessageActionRow,
	MessageButton
} from 'discord.js'

export const event: Event = {
	name: 'guildCreate',
	run: async (client, guild: Guild) => {
		console.log(`Joined ${guild.name} guild!`)

		if (!guild.systemChannel) return

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

		const buttonsRow = new MessageActionRow().addComponents(
			new MessageButton().setURL(link).setLabel('Invite bot').setStyle('LINK')
		)

		const embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(client.user.username)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setDescription(client.locales.guildCreate.description)

		return guild.systemChannel.send({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
