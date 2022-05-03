import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { Button } from '../Interfaces'

export const button: Button = {
	customId: /reload_gun/,
	run: async (client, interaction) => {
		client.gun.drum = [false, false, false, false, false, false]
		client.gun.drum[Math.floor(Math.random() * 6)] = true

		const embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle('Gun is reloaded!')

		const buttonsRow = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId('gun_shoot')
				.setLabel('Shoot')
				.setStyle('PRIMARY')
		])

		return interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
