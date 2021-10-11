import { Event } from '../Interfaces'

export const event: Event = {
	name: 'ready',
	run: (client) => {
		client.user.setActivity(`${client.config.prefix}help - help`)
		console.log(`${client.user.tag} is up!`)
	}
}
