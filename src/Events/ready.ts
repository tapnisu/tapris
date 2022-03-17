import { Event } from '../Interfaces'
import { ApplicationCommandDataResolvable } from 'eris'

export const event: Event = {
	name: 'ready',
	run: (client) => {
		client.user.setActivity('Type "/" to check bot commands!')

		const commands = client.application?.commands

		client.commands.forEach((command) => {
			commands?.create(command as ApplicationCommandDataResolvable)
		})

		console.log(`${client.user.tag} is up!`)
	}
}
