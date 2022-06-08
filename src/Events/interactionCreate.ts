import { Interaction } from 'discord.js'
import { Event, Command, Button } from '../Interfaces'

export const event: Event = {
	name: 'interactionCreate',
	run: (client, interaction: Interaction) => {
		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName)
			if (command)
			{
				interaction.deferReply()

				;(command as Command).run(client, interaction)
			} 

			return
		}

		if (interaction.isButton()) {
			const button = client.buttons.find((button) =>
				button.customId.test(interaction.customId)
			)
			if (button) (button as Button).run(client, interaction)
		}
	}
}
