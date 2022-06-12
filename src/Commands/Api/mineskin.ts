import { Command } from "../../Interfaces";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";
import { AxiosResponse } from "../../Interfaces/Axios";
import { AshconResponse } from "../../Interfaces/Ashcon";
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
			const response: AxiosResponse = await axios.get(
				`https://api.ashcon.app/mojang/v2/user/${encodeURI(nickname)}`
			);

			const user: AshconResponse = response.data;

			const row = new ActionRowBuilder().addComponents([
				new ButtonBuilder()
					.setURL(user.textures.skin.url)
					.setLabel("Original image")
					.setStyle(ButtonStyle.Link)
			]);

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(user.username)
				.setDescription(`UUID: ${user.uuid}`)
				.setThumbnail(`https://crafatar.com/renders/head/${user.uuid}?overlay`)
				.setImage(`https://crafatar.com/renders/body/${user.uuid}?overlay`)
				.setURL(user.textures.skin.url);

			return interaction.reply({ embeds: [Embed], components: [row] });
		} catch {
			return interaction.reply({
				content: "User not found :no_entry_sign:",
				ephemeral: true
			});
		}
	}
};
