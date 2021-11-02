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

		return interaction.reply(`Password: ||${password}|| :keyboard:`)
	}
}
