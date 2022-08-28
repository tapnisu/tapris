import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

import axios from "axios";
import { Command } from "../../Interfaces";
import { AshconResponse } from "../../Interfaces/Ashcon";
import getLocale from "../../Locales";

export const command: Command = {
	name: "mineskin",
	description: "Get minecraft skin & UUID",
	options: [
		{
			name: "user",
			description: "User of the user to be shown",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const nickname = interaction.options.getString("user");
		const { mineskinLocale } = await getLocale(interaction.guildId);

		let response: AshconResponse;

		try {
			response = (
				await axios.get(
					`https://api.ashcon.app/mojang/v2/user/${encodeURI(nickname)}`
				)
			).data;
		} catch {
			return await interaction.reply({
				content: mineskinLocale.notFound,
				ephemeral: true
			});
		}

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setURL(response.textures.skin.url)
				.setLabel(mineskinLocale.originalImage)
				.setStyle(ButtonStyle.Link)
		]);

		await interaction.deferReply();

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response.username)
			.setDescription(mineskinLocale.uuid(response.uuid))
			.setThumbnail(
				`https://crafatar.com/renders/head/${response.uuid}?overlay`
			)
			.setImage(`https://crafatar.com/renders/body/${response.uuid}?overlay`)
			.setURL(response.textures.skin.url);

		return await interaction.followUp({ embeds: [Embed], components: [row] });
	}
};
