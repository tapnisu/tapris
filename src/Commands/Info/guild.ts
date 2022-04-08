import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'guild',
	description: 'Get info about guild',
	run: async (client, interaction) => {
		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(interaction.guild.name)
			.setThumbnail(
				`https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png`
			)
			.setDescription('Info about guild')
			.addFields(
				{
					name: 'Owner',
					value: `<@!${interaction.guild.ownerId}>`,
					inline: true
				},
				{
					name: 'Number of participants',
					value: interaction.guild.memberCount.toString(),
					inline: true
				},
				{
					name: 'Number of emoticons',
					value: interaction.guild.emojis.cache.size.toString(),
					inline: true
				},
				{
					name: 'Number of roles',
					value: (interaction.guild.roles.cache.size - 1).toString(),
					inline: true
				},
				{ name: 'ID', value: interaction.guild.id, inline: true }
			)

		return interaction.reply({ embeds: [Embed] })
	}
}
