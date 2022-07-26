import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
	name: "user",
	description: "Sends user information",
	options: [
		{
			name: "user",
			description: "User to be shown",
			type: 6,
			required: true
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser("user");
		const member = await interaction.guild.members.fetch(user.id);
		const channelEmbed: string = interaction.guild.members.cache.get(user.id)
			.voice.channel?.id;

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`${user.tag} ${user.bot ? "[bot]" : ""}`)
			.setDescription(`Server member: ${interaction.guild.name}`)
			.setThumbnail(user.displayAvatarURL({ forceStatic: false }))
			.addFields([
				{
					name: "Channel",
					value: channelEmbed != null ? `<#${channelEmbed}>` : "Not in channel",
					inline: true
				}
			])
			.setTimestamp();

		if (member.presence?.status == "online")
			embed.addFields({
				name: "Status",
				value: ":green_circle: Online",
				inline: true
			});

		if (member.presence?.status == "offline")
			embed.addFields({
				name: "Status",
				value: ":black_circle: Offline",
				inline: true
			});

		if (member.presence?.status == "idle")
			embed.addFields({
				name: "Status",
				value: ":crescent_moon: Not active",
				inline: true
			});

		if (member.presence?.status == "dnd")
			embed.addFields({
				name: "Status",
				value: ":red_circle: Do not disturb",
				inline: true
			});

		embed.addFields({ name: "Id", value: user.id, inline: true });

		return await interaction.reply({ embeds: [embed] });
	}
};
