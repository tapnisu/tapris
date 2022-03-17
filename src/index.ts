import Client from './Core'

new Client(process.env.TOKEN, {
	intents: [
		'guilds',
		'guildMessages',
		'guildMembers',
		'guildVoiceStates'
	]
}).init()
