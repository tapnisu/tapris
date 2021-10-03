import { ColorResolvable } from 'discord.js'

export interface Config {
	token: string
	prefix: string
	commandsSpeed: number
	botColor: ColorResolvable
	starEmoji: string
}
