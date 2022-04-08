import { Event } from '../Interfaces'
import { Guild, MessageEmbed } from 'discord.js'

export const event: Event = {
	name: 'guildCreate',
	run: (client, guild: Guild) => {
		console.log(`Joined ${guild.name} guild`)

		const embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(guild.name)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

		guild.systemChannel.send({ embeds: [embed] })
	}
}
