import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'password',
	description: 'Password generator',
	options: [
		{
			name: 'length',
			description: 'Set length of password',
			type: 4,
			required: true
		}
	],
	run: async (client, interaction) => {
		const charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		let password = ''

		const passwordLength = interaction.options.getInteger('length')

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

		const embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle('Password')
			.setDescription(password)

		return interaction.reply({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
