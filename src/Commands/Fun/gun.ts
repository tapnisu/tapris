import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
	name: "gun",
	description: "Russian roulette",
	options: [
		{
			name: "command",
			description: "What to do with gun",
			choices: [
				{ name: "Reload drum", value: "reload" },
				{ name: "Shoot", value: "shoot" }
			],
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const command = interaction.options.getString("command");

		if (command == "reload") {
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

			return await interaction.reply({
				embeds: [embed],
				components: [buttonsRow]
			});
		}

		if (command == "shoot") {
			if (client.gun.drum.length == 0) {
				const embed = new EmbedBuilder()
					.setColor(client.env.BOT_COLOR)
					.setTitle("Gun is empty! :grinning:");

				const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
					new ButtonBuilder()
						.setCustomId("reload_gun")
						.setLabel("Reload gun")
						.setStyle(ButtonStyle.Primary)
				]);

				return await interaction.reply({
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

			if (client.gun.drum[0]) embed.setTitle("You died...");
			if (!client.gun.drum[0]) embed.setTitle("Nothing happened!");

			client.gun.drum.shift();
			return await interaction.reply({
				embeds: [embed],
				components: [buttonsRow]
			});
		}
	}
};
