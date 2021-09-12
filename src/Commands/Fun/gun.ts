import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'gun',
	description: 'Russian roulette',
	aliases: ['new / shoot'],
	run: async (client, message, args) => {
		if (args[0] == 'new') {
			global.drum = [false, false, false, false, false, false]
			let random: number = Math.floor(Math.random() * 6)
			global.drum[random] = true

			return message.channel.send('Gun is reloaded!')
		}

		if (args[0] == 'shoot') {
			if (!global.drum)
				return message.channel.send('There is no gun :no_entry_sign:')

			if (global.drum[0] == true)
				message.channel.send(':exploding_head: :gun: ')

			if (global.drum[0] == false || global.drum.length == 0)
				message.channel.send(':grinning: :gun:')

			return global.drum.shift()
		}

		return message.channel.send(
			'You did not supply enough arguments :no_entry_sign:'
		)
	}
}
