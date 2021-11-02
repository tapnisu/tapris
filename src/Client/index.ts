import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { Command, Event, Config, Music, Gun } from '../Interfaces'
import ConfigJson from '../config.json'

class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection()
	public events: Collection<string, Event> = new Collection()
	public config: Config = ConfigJson as Config
	public music: Music = {
		queue: [],
		connection: undefined
	}
	public gun: Gun = {
		drum: []
	}

	public async init() {
		this.login(this.config.token)

		readdirSync('dist/Commands').forEach((dir) => {
			const commands = readdirSync(`dist/Commands/${dir}`).filter((file) =>
				file.endsWith('.js')
			)

			for (const file of commands) {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const { command } = require(`${__dirname}/../Commands/${dir}/${file}`)

				this.commands.set(command.name, command)
			}
		})

		readdirSync('dist/Events')
			.filter((file) => file.endsWith('.js'))
			.forEach(async (file) => {
				const { event } = await import(`../Events/${file}`)
				this.events.set(event.name, event)
				this.on(event.name, event.run.bind(null, this))
			})
	}
}

export default ExtendedClient
