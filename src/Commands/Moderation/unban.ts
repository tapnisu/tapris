import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
	name: "unban",
	description: "Unban the user",
	options: [
		{
			name: "id",
			description: "User id to be unbanned",
			type: 4,
			required: true
		}
	],
	run: async (client, interaction) => {
		const userMember = interaction.guild.members.cache.get(interaction.user.id);
		const userId = interaction.options.getString("id");

		const { unbanLocale } = await getLocale(interaction.guildId);

		if (
			!userMember.permissions.has("Administrator") &&
			!userMember.permissions.has("BanMembers")
		)
			return await interaction.reply({
				content: unbanLocale.noPermission,
				ephemeral: true
			});

		interaction.guild.members
			.unban(userId)
			.then(async () => {
				await interaction.deferReply();

				return await interaction.followUp(unbanLocale.success(userId));
			})
			.catch(async () => {
				return await interaction.reply({
					content: unbanLocale.failure(userId),
					ephemeral: true
				});
			});
	}
};
