import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'coin',
	description: 'Flip a coin',
	run: async (client, interaction) => {
		const messages: string[] = [':coin: Tail!', ':eagle: Eagle!']
		const random: number = Math.floor(Math.random() * 2)

		return interaction.reply(messages[random])
	}
}
