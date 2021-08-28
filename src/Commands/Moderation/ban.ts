import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'ban',
	description: 'Ban the user',
	aliases: ['ping'],
	run: async (client, message, args) => {
		let member = message.mentions.users.first()
		if (
			!message.member.permissions.has('ADMINISTRATOR') &&
			!message.member.permissions.has('BAN_MEMBERS')
		)
			return message.channel.send('You can`t ban kick members! :no_entry_sign:')
		if (!member)
			return message.channel.send('User is not found :no_entry_sign:')

		let target = message.guild.members.cache.get(member.id)

		target
			.ban()
			.then(() => {
				return message.channel.send(`<@!${member.id}> was banned :door:`)
			})
			.catch(() => {
				return message.channel.send(
					`<@!${member.id}> was **NOT** banned :no_entry_sign: `
				)
			})
	}
}
