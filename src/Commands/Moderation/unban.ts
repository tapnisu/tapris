import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'unban',
	description: 'Unban the user',
	aliases: ['user id'],
	run: async (client, message, args) => {
		if (
			!message.member.permissions.has('ADMINISTRATOR') ||
			!message.member.permissions.has('BAN_MEMBERS')
		)
			return message.channel.send('You can`t unban members! :no_entry_sign:')
		if (!args[0])
			return message.channel.send(
				'You did not supply enough arguments :no_entry_sign:'
			)

		message.guild.members
			.unban(args[0])
			.then(() => {
				return message.channel.send(`<@!${args[0]}> was unbanned :door:`)
			})
			.catch(() => {
				return message.channel.send(
					`<@!${args[0]}> was **NOT** unbanned! :no_entry_sign: `
				)
			})
	}
}
