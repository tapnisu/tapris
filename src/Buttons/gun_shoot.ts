import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";
import { getGuild, updateGuild } from "../db";

import { Button } from "../Interfaces";

export const button: Button = {
	customId: /gun_shoot/,
	run: async (client, interaction) => {
		const guild = await getGuild(interaction.guildId);

		if (guild.gun.length == 0) {
			const embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle("Gun is empty! :grinning:");

			const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
				new ButtonBuilder()
					.setCustomId("reload_gun")
					.setLabel("Reload gun")
					.setStyle(ButtonStyle.Primary)
			]);

			return await interaction.update({
				embeds: [embed],
				components: [buttonsRow]
			});
		}

		const embed = new EmbedBuilder().setColor(client.env.BOT_COLOR);

		const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setCustomId("gun_shoot")
				.setLabel("Shoot")
				.setStyle(ButtonStyle.Primary)
		]);

		if (guild.gun[0]) embed.setTitle("You died...");
		if (!guild.gun[0]) embed.setTitle("Nothing happend!");

		guild.gun.shift();
		updateGuild(guild);

		return await interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
