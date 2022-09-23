import { Command } from "@Interfaces/index";
import getLocale from "@Locales/index";

export const command: Command = {
	name: "ban",
	description: "Ban the user",
	options: [
		{
			name: "user",
			description: "User to be banned",
			type: 6,
			required: true
		},
		{
			name: "reason",
			description: "Reason to be shown",
			type: 3,
			required: false
		}
	],
	guildsOnly: true,
	run: async (client, interaction) => {
		const member = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const userMember = interaction.guild.members.cache.get(interaction.user.id);

		const { banLocale } = await getLocale(interaction.guildId);

		if (
			!userMember.permissions.has("Administrator") &&
			!userMember.permissions.has("BanMembers")
		)
			return await interaction.reply({
				content: banLocale.noPermission,
				ephemeral: true
			});

		const target = interaction.guild.members.cache.get(member.id);

		if (target.roles.highest.position >= userMember.roles.highest.position)
			return await interaction.reply({
				content: banLocale.lowerRole,
				ephemeral: true
			});

		target
			.ban({ reason: reason ? reason : null })
			.then(async () => {
				await interaction.deferReply();

				return await interaction.followUp(banLocale.success(member.id));
			})
			.catch(async () => {
				return await interaction.reply({
					content: banLocale.failure(member.id),
					ephemeral: true
				});
			});
	}
};
