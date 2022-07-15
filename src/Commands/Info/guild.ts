import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
	name: "guild",
	description: "Get info about guild",
	run: async (client, interaction) => {
		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(interaction.guild.name)
			.setThumbnail(
				`https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png`
			)
			.setDescription(
				interaction.guild.description
					? interaction.guild.description
					: "No description"
			)
			.addFields([
				{
					name: "Owner",
					value: `<@!${interaction.guild.ownerId}>`,
					inline: true
				},
				{
					name: "Amount of participants",
					value: interaction.guild.memberCount.toString(),
					inline: true
				},
				{
					name: "Amount of emoticons",
					value: interaction.guild.emojis.cache.size.toString(),
					inline: true
				},
				{
					name: "Amount of roles",
					value: (interaction.guild.roles.cache.size - 1).toString(),
					inline: true
				},
				{ name: "ID", value: interaction.guild.id, inline: true }
			]);

		return await interaction.reply({ embeds: [Embed] });
	}
};
