import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'leave',
	description: 'Exit the voice channel',
	run: async (client, interaction) => {
		client.music.queue = []
		client.music.connection.destroy()

		return interaction.createMessage('Successfully quit the channel! :door:')
	}
}
