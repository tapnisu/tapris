import { Event } from '../Interfaces'
import { readdirSync } from 'fs'

export const event: Event = {
	name: 'ready',
	run: (client) => {
		client.editStatus('online', {name: 'Type "/" to check bot commands!'})

		readdirSync('dist/Commands').forEach(async (dir) => {
			const commands = readdirSync(`dist/Commands/${dir}`).filter((file) =>
				file.endsWith('.js')
			)

			for (const file of commands) {
				const { command } = await import(
					`${__dirname}/../Commands/${dir}/${file}`
				)

				client.commands.set(command.name, command)
				client.createCommand(command)
			}
		})

		console.log(`${client.user.username}#${client.user.discriminator} is up!`)
	}
}
