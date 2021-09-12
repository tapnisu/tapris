import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'kick',
	description: 'Kick the user',
	aliases: ['ping'],
	run: async (client, message, args) => {
		let member = message.mentions.users.first()
		if (
			!message.member.permissions.has('ADMINISTRATOR') ||
			!message.member.permissions.has('KICK_MEMBERS')
		)
			return message.channel.send('You can`t kick members! :no_entry_sign:')
		if (!member)
			return message.channel.send('User is not found !:no_entry_sign:')

		let target = message.guild.members.cache.get(member.id)

		if (target.roles.highest.position >= message.member.roles.highest.position)
			return message.channel.send(
				'User has higher role then you! :no_entry_sign:'
			)

		target
			.kick()
			.then(() => {
				return message.channel.send(`<@!${member.id}> was deleted :door: `)
			})
			.catch(() => {
				return message.channel.send(
					`<@!${member.id}> was **NOT** deleted! :no_entry_sign: `
				)
			})
	}
}
