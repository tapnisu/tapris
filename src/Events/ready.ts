import { Event } from '../Interfaces'
import { ApplicationCommandDataResolvable } from 'discord.js'

export const event: Event = {
	name: 'ready',
	run: (client) => {
		client.user.setActivity('Type "/" to get help :>')

		const commands = client.application?.commands

		client.commands.forEach((command) => {
			commands?.create(command as ApplicationCommandDataResolvable)
		})

		console.log(`${client.user.tag} is up!`)
	}
}
