import Client from '../Client'
import { ClientEvents } from 'discord.js'

interface Run {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(client: Client, ...args: any[])
}

export interface Event {
	name: keyof ClientEvents
	run: Run
}
