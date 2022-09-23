import { getGuild, updateGuild } from "@db/index";
import { Command } from "@Interfaces/index";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from "discord.js";
import getLocale from "../../Locales";

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
	guildsOnly: true,
	run: async (client, interaction) => {
		const command = interaction.options.getString("command");
		const guild = await getGuild(interaction.guildId);

		const { gunLocale } = await getLocale(interaction.guildId);

		if (command == "reload") {
			await interaction.deferReply();

			guild.gun = [false, false, false, false, false, false];
			guild.gun[Math.floor(Math.random() * 6)] = true;

			const embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(gunLocale.reloadedGun);

			const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
				new ButtonBuilder()
					.setCustomId("gun_shoot")
					.setLabel(gunLocale.shoot)
					.setStyle(ButtonStyle.Primary)
			]);

			return await interaction.followUp({
				embeds: [embed],
				components: [buttonsRow]
			});
		}

		if (command == "shoot") {
			await interaction.deferReply();

			if (guild.gun.length == 0) {
				const embed = new EmbedBuilder()
					.setColor(client.env.BOT_COLOR)
					.setTitle(gunLocale.emptyGun);

				const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
					new ButtonBuilder()
						.setCustomId("reload_gun")
						.setLabel(gunLocale.reloadGun)
						.setStyle(ButtonStyle.Primary)
				]);

				return await interaction.followUp({
					embeds: [embed],
					components: [buttonsRow],
					ephemeral: true
				});
			}

			const embed = new EmbedBuilder().setColor(client.env.BOT_COLOR);

			const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
				new ButtonBuilder()
					.setCustomId("gun_shoot")
					.setLabel(gunLocale.shoot)
					.setStyle(ButtonStyle.Primary)
			]);

			if (guild.gun[0]) embed.setTitle(gunLocale.youDied);
			if (!guild.gun[0]) embed.setTitle(gunLocale.nothingHappend);

			guild.gun.shift();

			updateGuild(guild);

			return await interaction.followUp({
				embeds: [embed],
				components: [buttonsRow]
			});
		}
	}
};
