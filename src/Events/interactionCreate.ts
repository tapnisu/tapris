import { CommandInteraction } from 'discord.js'
import { Event, Command } from '../Interfaces'

export const event: Event = {
	name: 'interactionCreate',
	run: (client, interaction: CommandInteraction) => {
		if (!interaction.isCommand()) return

		const command = client.commands.get(interaction.commandName)
		if (command) (command as Command).run(client, interaction)
	}
}
