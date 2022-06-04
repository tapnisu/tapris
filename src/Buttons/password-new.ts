import { MessageActionRow, MessageButton, EmbedBuilder } from 'discord.js'
import { Button } from '../Interfaces'

export const button: Button = {
	customId: /password_(.*)/gi,
	run: async (client, interaction) => {
		const charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		let password = ''

		const passwordLength = Number(interaction.customId.replace(/password_/, ''))

		for (let i = 0, n = charset.length; i < passwordLength; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n))
		}

		const buttonsRow = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId(`password_${passwordLength}`)
				.setLabel('Create new')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('delete_message')
				.setLabel('Delete')
				.setStyle('DANGER')
		])

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle('Password')
			.setDescription(password)

		return interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
