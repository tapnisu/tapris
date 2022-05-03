import { Message } from 'discord.js'
import { Button } from '../Interfaces'

export const button: Button = {
	customId: /delete_message/,
	run: async (client, interaction) => {
		const message = interaction.message as Message

		return message.delete()
	}
}
