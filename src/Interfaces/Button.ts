import Client from '../Core'
import { ButtonInteraction } from 'discord.js'

interface Run {
	(client: Client, interaction: ButtonInteraction)
}

export interface Button {
	customId: RegExp
	run: Run
}
