import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	Guild,
	OAuth2Scopes
} from "discord.js";

import { Event } from "../Interfaces";

export const event: Event = {
	name: "guildCreate",
	run: async (client, guild: Guild) => {
		console.log(`Joined ${guild.name} guild!`);

		if (!guild.systemChannel) return;

		const link: string = client.generateInvite({
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

		const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setURL(link)
				.setLabel("Invite bot")
				.setStyle(ButtonStyle.Link)
		]);

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(client.user.username)
			.setThumbnail(client.user.displayAvatarURL({ forceStatic: false }))
			.setDescription(client.locales.guildCreate.description);

		return guild.systemChannel.send({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
