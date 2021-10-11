import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'coin',
	description: 'Flip a coin',
	aliases: [],
	run: async (client, message, args) => {
		var messages: string[] = [':coin: Tail!', ':eagle: Eagle!']
		var random: number = Math.floor(Math.random() * 2)

		return message.channel.send(messages[random])
	}
}
