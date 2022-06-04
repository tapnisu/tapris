import { MessageActionRow, MessageButton, EmbedBuilder } from 'discord.js'
import { Button } from '../Interfaces'

export const button: Button = {
	customId: /gun_shoot/,
	run: async (client, interaction) => {
		if (client.gun.drum.length == 0) {
			const embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle('Gun is empty! :grinning:')

			const buttonsRow = new MessageActionRow().addComponents([
				new MessageButton()
					.setCustomId('reload_gun')
					.setLabel('Reload gun')
					.setStyle('PRIMARY')
			])

			return interaction.update({
				embeds: [embed],
				components: [buttonsRow]
			})
		}

		const embed = new EmbedBuilder().setColor(client.env.BOT_COLOR)

		const buttonsRow = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId('gun_shoot')
				.setLabel('Shoot')
				.setStyle('PRIMARY')
		])

		if (client.gun.drum[0]) embed.setTitle('You died...')
		if (!client.gun.drum[0]) embed.setTitle('Nothing happend!')

		client.gun.drum.shift()
		return interaction.update({ embeds: [embed], components: [buttonsRow] })
	}
}
