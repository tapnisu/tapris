import { MessageActionRow, MessageButton } from 'discord.js'
import { Button } from '../Interfaces'

export const button: Button = {
	customId: 'password-new',
	run: async (client, interaction) => {
		const charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		let password = ''
		const passwordLength = 8

		for (let i = 0, n = charset.length; i < passwordLength; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n))
		}

		const buttonsRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('password-new')
					.setLabel('Create new')
					.setStyle('PRIMARY')
			)

		return interaction.reply({content: `Password: ||${password}|| :keyboard:`, components: [buttonsRow] })
	}
}
