import { Command } from '../../Interfaces'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'avatar',
	description: 'Get user`s avatar',
	options: [
		{
			name: 'user',
			description: 'User to get avatar from',
			type: 6,
			required: true
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user')

		const avatarUrl = user.displayAvatarURL({ dynamic: true })

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`${user.tag}\`s avatar`)
			.setImage(avatarUrl)
			.setTimestamp()

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL(avatarUrl)
				.setLabel('Link to avatar')
				.setStyle('LINK')
		)

		return interaction.reply({ embeds: [Embed], components: [row] })
	}
}
