import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

import { AshconResponse } from "../../Interfaces/Ashcon";
import { Command } from "../../Interfaces";
import axios from "axios";

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

		try {
			const response: AshconResponse = (
				await axios.get(
					`https://api.ashcon.app/mojang/v2/user/${encodeURI(nickname)}`
				)
			).data;

			const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
				new ButtonBuilder()
					.setURL(response.textures.skin.url)
					.setLabel("Original image")
					.setStyle(ButtonStyle.Link)
			]);

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(response.username)
				.setDescription(`UUID: ${response.uuid}`)
				.setThumbnail(
					`https://crafatar.com/renders/head/${response.uuid}?overlay`
				)
				.setImage(`https://crafatar.com/renders/body/${response.uuid}?overlay`)
				.setURL(response.textures.skin.url);

			return await interaction.reply({ embeds: [Embed], components: [row] });
		} catch {
			return await interaction.reply({
				content: "User not found :no_entry_sign:",
				ephemeral: true
			});
		}
	}
};
