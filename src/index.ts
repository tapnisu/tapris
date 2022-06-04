import Client from './Core'

new Client({
	intents: [
		'Guilds', 'GuildMessages', 'GuildMembers', 'GuildVoiceStates'
	]
}).init()
