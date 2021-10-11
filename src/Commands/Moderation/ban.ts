import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'ban',
	description: 'Ban the user',
	aliases: ['ping'],
	run: async (client, message, args) => {
		var member = message.mentions.users.first()
		if (
			!message.member.permissions.has('ADMINISTRATOR') ||
			!message.member.permissions.has('BAN_MEMBERS')
		)
			return message.channel.send('You can`t ban members! :no_entry_sign:')
		if (!member)
			return message.channel.send('User is not found! :no_entry_sign:')

		var target = message.guild.members.cache.get(member.id)

		if (target.roles.highest.position >= message.member.roles.highest.position)
			return message.channel.send(
				'User has higher (or same) role then you! :no_entry_sign:'
			)

		target
			.ban()
			.then(() => {
				return message.channel.send(`<@!${member.id}> was banned :door:`)
			})
			.catch(() => {
				return message.channel.send(
					`<@!${member.id}> was **NOT** banned! :no_entry_sign: `
				)
			})
	}
}
