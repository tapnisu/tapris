import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
	name: "guild",
	description: "Get info about guild",
	run: async (client, interaction) => {
		await interaction.deferReply();
		const { guildLocale } = await getLocale(interaction.guildId);

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(interaction.guild.name)
			.setThumbnail(
				`https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png`
			)
			.setDescription(
				interaction.guild.description
					? interaction.guild.description
					: guildLocale.noDescription
			)
			.addFields([
				{
					name: guildLocale.owner,
					value: `<@!${interaction.guild.ownerId}>`,
					inline: true
				},
				{
					name: guildLocale.memberCount,
					value: interaction.guild.memberCount.toString(),
					inline: true
				},
				{
					name: guildLocale.emojis,
					value: interaction.guild.emojis.cache.size.toString(),
					inline: true
				},
				{
					name: guildLocale.roles,
					value: (interaction.guild.roles.cache.size - 1).toString(),
					inline: true
				},
				{
					name: guildLocale.stickers,
					value: (interaction.guild.stickers.cache.size - 1).toString(),
					inline: true
				},
				{ name: guildLocale.id, value: interaction.guild.id, inline: true }
			]);

		return await interaction.followUp({ embeds: [Embed] });
	}
};
