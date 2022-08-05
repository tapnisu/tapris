import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
	name: "password",
	description: "Password generator",
	options: [
		{
			name: "length",
			description: "Set length of password",
			type: 4,
			required: true
		}
	],
	run: async (client, interaction) => {
		await interaction.deferReply();

		const charset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let password = "";

		const passwordLength = interaction.options.getInteger("length");

		for (let i = 0, n = charset.length; i < passwordLength; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n));
		}

		const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setCustomId(`password_${passwordLength}`)
				.setLabel("Create new")
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId("delete_message")
				.setLabel("Delete")
				.setStyle(ButtonStyle.Danger)
		]);

		const embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle("Password")
			.setDescription(password);

		return await interaction.followUp({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
