import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'user',
	description: 'Sends user information',
	options: [
		{
			name: 'user',
			description: 'User to be shown',
			type: 6,
			required: false
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user')
			? interaction.options.getUser('user')
			: interaction.user

		let channelEmbed: string = interaction.guild.members.cache.get(user.id)
			.voice.channel?.name

		if (channelEmbed == null) channelEmbed = 'Not in the channel'

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(user.tag)
			.setDescription(`Server member: ${interaction.guild.name}`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Channel', value: channelEmbed },
				{ name: 'Id', value: user.id }
			)
			.setTimestamp()

		return interaction.reply({ embeds: [Embed] })
	}
}
