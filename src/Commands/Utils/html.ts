import { Command } from '../../Interfaces'
import { convert } from 'html-to-text'

export const command: Command = {
	name: 'html',
	description: 'Convert html to text',
	options: [
		{
			name: 'text',
			description: 'Text to be decoded',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const text: string = interaction.options['text']

		const response: string = convert(text, { wordwrap: 130 })

		return interaction.reply(response)
	}
}
