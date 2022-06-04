import Client from './Core'

new Client({
	intents: [
		'GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'
	]
}).init()
