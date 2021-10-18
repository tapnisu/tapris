import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'user',
	description: 'Sends user information',
	aliases: ['ping'],
	run: async (client, message, args) => {
		const mentioned = message.mentions.users.first()

		const user = mentioned ? mentioned : message.author

		let channelEmbed: string = message.guild.members.cache.get(user.id).voice
			.channel?.name

		if (channelEmbed == null) channelEmbed = 'Not in the channel'

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(user.tag)
			.setDescription(`Server member: ${message.guild.name}`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Channel', value: channelEmbed },
				{ name: 'Id', value: user.id }
			)
			.setTimestamp()

		return message.channel.send({ embeds: [Embed] })
	}
}
