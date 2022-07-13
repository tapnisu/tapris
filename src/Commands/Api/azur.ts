import { AzurResponse } from "../../Interfaces/Azur";
import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
	name: "azur",
	description: "Get data about Azur Lane",
	options: [
		{
			name: "name",
			description: "Name of ship",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const request = encodeURI(interaction.options["name"].toLowerCase());

		let response: AzurResponse;

		try {
			response = (
				await axios.get(
					`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
				)
			).data;
		} catch {
			return interaction.reply({
				content: "Ship not found :no_entry_sign:",
				ephemeral: true
			});
		}

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response.name)
			.setURL(`https://azurlane.koumakan.jp/${request}`)
			.setDescription(response.rarity)
			.addFields([
				{ name: "ID", value: response.ID, inline: true },
				{ name: "Hull", value: response.hull, inline: true },
				{ name: "Navy", value: response.navy, inline: true },
				{ name: "Class", value: response.class, inline: true },
				{ name: "Voice acting", value: response.voiceActress, inline: true }
			]);

		return interaction.reply({ embeds: [Embed] });
	}
};
