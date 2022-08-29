import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

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
		await interaction.deferReply();

		const user = interaction.options.getUser("user");
		const member = await interaction.guild.members.fetch(user.id);
		const channelEmbed: string = interaction.guild.members.cache.get(user.id)
			.voice.channel?.id;

		const { userLocale } = await getLocale(interaction.guildId);

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`${user.tag} ${user.bot ? userLocale.bot : ""}`)
			.setDescription(userLocale.serverMember(interaction.guild.name))
			.setThumbnail(user.displayAvatarURL({ forceStatic: false }))
			.addFields([
				{
					name: userLocale.channel,
					value:
						channelEmbed != null
							? `<#${channelEmbed}>`
							: userLocale.notInChannel,
					inline: true
				}
			])
			.setTimestamp();

		if (member.presence?.status == "online")
			embed.addFields({
				name: userLocale.status.title,
				value: userLocale.status.online,
				inline: true
			});

		if (member.presence?.status == "offline")
			embed.addFields({
				name: userLocale.status.title,
				value: userLocale.status.offline,
				inline: true
			});

		if (member.presence?.status == "idle")
			embed.addFields({
				name: userLocale.status.title,
				value: userLocale.status.idle,
				inline: true
			});

		if (member.presence?.status == "dnd")
			embed.addFields({
				name: userLocale.status.title,
				value: userLocale.status.dnd,
				inline: true
			});

		embed.addFields({ name: "Id", value: user.id, inline: true });

		return await interaction.followUp({ embeds: [embed] });
	}
};
