import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
	name: "avatar",
	description: "Get someones avatar",
	options: [
		{
			name: "user",
			description: "User to get avatar from",
			type: 6,
			required: true
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser("user");
		const avatarUrl = user.displayAvatarURL({ size: 4096, forceStatic: false });

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setAuthor({
				iconURL: avatarUrl,
				name: `${user.tag}\`s avatar`
			})
			.setImage(avatarUrl);

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setURL(avatarUrl)
				.setLabel("Link to avatar")
				.setStyle(ButtonStyle.Link)
		]);

		return await interaction.reply({ embeds: [Embed], components: [row] });
	}
};
