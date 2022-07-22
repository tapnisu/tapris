import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

import { Button } from "../Interfaces";

export const button: Button = {
	customId: /reload_gun/,
	run: async (client, interaction) => {
		client.gun.drum = [false, false, false, false, false, false];
		client.gun.drum[Math.floor(Math.random() * 6)] = true;

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle("Gun is reloaded!");

		const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setCustomId("gun_shoot")
				.setLabel("Shoot")
				.setStyle(ButtonStyle.Primary)
		]);

		return await interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
