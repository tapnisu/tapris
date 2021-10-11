import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'gun',
	description: 'Russian roulette',
	aliases: ['new / shoot'],
	run: async (client, message, args) => {
		if (args[0] == 'new') {
			client.gun.drum = [false, false, false, false, false, false]
			client.gun.drum[Math.floor(Math.random() * 6)] = true

			return message.channel.send('Gun is reloaded!')
		}

		if (args[0] == 'shoot') {
			if (!client.gun.drum)
				return message.channel.send('There is no gun :no_entry_sign:')

			if (client.gun.drum.length == 0)
				message.channel.send('Gun is empty! :grinning:')
			if (client.gun.drum[0] == true)
				message.channel.send(':exploding_head: :gun: ')

			if (client.gun.drum[0] == false) message.channel.send(':grinning: :gun:')

			return client.gun.drum.shift()
		}

		return message.channel.send(
			'You did not supply enough arguments :no_entry_sign:'
		)
	}
}
