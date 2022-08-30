import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "help",
	description: "Get info about commands",
	options: [
		{
			name: "command",
			description: "Name of command to get info",
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		await interaction.deferReply();

		const request = interaction.options.getString("command");
		const command = client.commands.get(request);

		if (command) {
			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(command.name)
				.setDescription(command.description);

			command.options.forEach((option) => {
				Embed.addFields([
					{
						name: `${option.name}`,
						value: option.description ? option.description : "-",
						inline: true
					}
				]);
			});

			return await interaction.followUp({ embeds: [Embed] });
		}

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(client.user.username)
			.setThumbnail(client.user.displayAvatarURL({ forceStatic: false }));

		Embed.data.description = "";

		client.commands
			.sort((a, b) => {
				if (a.name > b.name) return 1;
				else if (a.name < b.name) return -1;
				return 0;
			})
			.forEach((command) => {
				Embed.data.description += `\`/${command.name} ${
					command.options
						? command.options
							.map(
								(option) =>
									`<${option.required ? "" : ""}${option.name} [${
										option.description
									}]>`
							)
							.join(" ")
						: ""
				}\` - ${command.description}\n`;
			});

		return await interaction.followUp({ embeds: [Embed] });
	}
};
