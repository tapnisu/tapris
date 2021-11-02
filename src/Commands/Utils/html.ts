import { Command } from '../../Interfaces'
import { convert } from 'html-to-text'

export const command: Command = {
	name: 'html',
	description: 'Convert html to text',
	options: [
		{
			name: 'text',
			description: 'Text to be coded',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const text = interaction.options.getString('text')

		const response: string = convert(text, { wordwrap: 130 })

		return interaction.reply(response)
	}
}
