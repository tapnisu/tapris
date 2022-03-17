import { CommandInteraction } from 'eris'
import { Event, Command } from '../Interfaces'

export const event: Event = {
	name: 'interactionCreate',
	run: (client, interaction: CommandInteraction) => {
		if (!(interaction.type == 2)) return

		const command = client.commands.get(interaction.data.name)
		if (command) (command as Command).run(client, interaction)
	}
}
