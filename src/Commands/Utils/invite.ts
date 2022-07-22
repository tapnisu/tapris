import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	OAuth2Scopes
} from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
	name: "invite",
	description: "Generates an invite",
	run: async (client, interaction) => {
		const link: string = await client.generateInvite({
			scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
			permissions: [
				"KickMembers",
				"BanMembers",
				"PrioritySpeaker",
				"ViewChannel",
				"SendMessages",
				"ManageMessages",
				"AttachFiles",
				"ReadMessageHistory",
				"Connect",
				"Speak",
				"UseApplicationCommands",
				"ManageThreads",
				"SendMessagesInThreads"
			]
		});

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setURL(link)
				.setLabel("Invite bot")
				.setStyle(ButtonStyle.Link)
		]);

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle("Click button to invite");

		return await interaction.reply({ embeds: [Embed], components: [row] });
	}
};
