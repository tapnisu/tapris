import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'password',
	description: 'Password generator',
	aliases: ['length'],
	run: async (client, message, args) => {
		const charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		let password = ''

		let passwordLength = 8
		if (!Number.isInteger(args[0])) passwordLength = Number(args[0])

		for (let i = 0, n = charset.length; i < passwordLength; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n))
		}

		return message.channel.send(`Password: ||${password}|| :keyboard:`)
	}
}
