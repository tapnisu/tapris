import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'gun',
	description: 'Russian roulette',
	options: [
		{
			name: 'command',
			description: 'What to do with gun',
			choices: [
				{ name: 'Create new drum', value: 'new' },
				{ name: 'Try to shoot at head', value: 'shoot' }
			],
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const command = interaction.options.getString('command')

		if (command == 'new') {
			client.gun.drum = [false, false, false, false, false, false]
			client.gun.drum[Math.floor(Math.random() * 6)] = true

			return interaction.reply('Gun is reloaded!')
		}

		if (command == 'shoot') {
			if (!client.gun.drum)
				return interaction.reply('There is no gun :no_entry_sign:')

			if (client.gun.drum.length == 0)
				interaction.reply('Gun is empty! :grinning:')
			if (client.gun.drum[0] == true)
				interaction.reply(':exploding_head: :gun: ')

			if (client.gun.drum[0] == false) interaction.reply(':grinning: :gun:')

			return client.gun.drum.shift()
		}
	}
}
