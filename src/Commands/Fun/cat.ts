import { Command } from '../../Interfaces'
import axios from 'axios'

export const command: Command = {
	name: 'cat',
	description: 'Get cat text',
	aliases: [],
	run: async (client, message, args) => {
		let response = (await axios.get('https://nekos.life/api/v2/cat')).data

		return message.channel.send(response.cat)
	}
}
