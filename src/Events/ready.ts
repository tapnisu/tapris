import { Event } from '../Interfaces'

global.queue = []

export const event: Event = {
	name: 'ready',
	run: (client) => {
		client.user.setActivity(`${client.config.prefix}help - help`)
		console.log(`${client.user.tag} is up!`)
	}
}
