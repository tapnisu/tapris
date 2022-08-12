import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	OAuth2Scopes
} from "discord.js";

import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
	name: "invite",
	description: "Generates an invite",
	run: async (client, interaction) => {
		await interaction.deferReply();

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

		const { inviteLocale } = await getLocale(interaction.guildId);

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setURL(link)
				.setLabel(inviteLocale.inviteBot())
				.setStyle(ButtonStyle.Link)
		]);

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(inviteLocale.inviteBot());

		return await interaction.followUp({ embeds: [Embed], components: [row] });
	}
};
