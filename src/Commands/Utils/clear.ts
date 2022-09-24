import { TextChannel } from "discord.js";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
	name: "clear",
	description: "Clearing messages",
	options: [
		{
			name: "amount",
			description: "Amount of messages to be deleted",
			type: 4,
			required: true
		}
	],
	guildsOnly: true,
	run: async (client, interaction) => {
		const amount = interaction.options.getInteger("amount");
		const channel = interaction.channel as TextChannel;
		const userMember = interaction.guild.members.cache.get(interaction.user.id);

		const { clearLocale } = await getLocale(interaction.guildId);

		if (!userMember.permissions.has("ManageMessages"))
			return await interaction.reply({
				content: clearLocale.noPermission,
				ephemeral: true
			});
		if (amount > 100)
			return await interaction.reply({
				content: clearLocale.bigRequest,
				ephemeral: true
			});
		if (amount < 1)
			return await interaction.reply({
				content: clearLocale.smallNumber,
				ephemeral: true
			});

		channel
			.bulkDelete(amount, true)
			.catch(
				async () =>
					await interaction.reply({
						content: clearLocale.oldMessages,
						ephemeral: true
					})
			)
			.then(async () => {
				await interaction.deferReply();

				await interaction.followUp({
					content: clearLocale.deletedNmessages(amount),
					ephemeral: true
				});
			});
	}
};
