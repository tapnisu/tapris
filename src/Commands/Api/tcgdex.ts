import { Datum, PokemontcgResponse } from "../../Interfaces/Pokemontcg";

import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
	name: "tcgdex",
	description: "Get pokemon card data TCG",
	options: [
		{
			name: "name",
			description: "Card name",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const name = interaction.options.getString("name");

		try {
			const response: PokemontcgResponse = (
				await axios.get(
					`https://api.pokemontcg.io/v2/cards?q=name:${encodeURI(name)}`
				)
			).data;

			const data: Datum = response.data[0];

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(`${data.supertype}: ${data.name}`)
				.setDescription(`${data.set.series}: ${data.set.name}`)
				.setThumbnail(data.set.images.symbol)
				.addFields({
					name: "Rarity",
					value: data.rarity,
					inline: true
				})
				.setImage(data.images.large)
				.setTimestamp(new Date(data.set.releaseDate));

			return await interaction.reply({ embeds: [Embed] });
		} catch {
			return await interaction.reply({
				content: "Card not found :no_entry_sign:",
				ephemeral: true
			});
		}
	}
};
