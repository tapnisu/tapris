import Client from '../Core'
import { ClientEvents } from 'eris'

interface Run {
	(client: Client, ...args: any[])
}

export interface Event {
	name: keyof ClientEvents
	run: Run
}
