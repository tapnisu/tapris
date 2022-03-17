import { Command } from '../../Interfaces'
import { MessageEmbed } from 'eris'

export const command: Command = {
	name: 'user',
	description: 'Sends user information',
	options: [
		{
			name: 'user',
			description: 'User to be shown',
			type: 6,
			required: true
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user')
		const channelEmbed: string = interaction.guild.members.cache.get(user.id)
			.voice.channel?.id

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`${user.tag} ${user.bot ? '[bot]' : ''}`)
			.setDescription(`Server member: ${interaction.guild.name}`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{
					name: 'Channel',
					value: channelEmbed != null ? `<#${channelEmbed}>` : 'Not in channel'
				},
				{ name: 'Id', value: user.id }
			)
			.setTimestamp()

		return interaction.reply({ embeds: [Embed] })
	}
}
