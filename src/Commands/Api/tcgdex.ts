import { Datum, PokemontcgResponse } from "../../Interfaces/Pokemontcg";

import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

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
		const { tcgdexLocale } = await getLocale(interaction.guildId);

		let response: PokemontcgResponse;

		try {
			response = (
				await axios.get(
					`https://api.pokemontcg.io/v2/cards?q=name:${encodeURI(name)}`
				)
			).data;
		} catch {
			return await interaction.reply({
				content: tcgdexLocale.notFound,
				ephemeral: true
			});
		}
		const data: Datum = response.data[0];

		await interaction.deferReply();

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`${data.supertype}: ${data.name}`)
			.setDescription(`${data.set.series}: ${data.set.name}`)
			.setThumbnail(data.set.images.symbol)
			.addFields({
				name: tcgdexLocale.rarity,
				value: data.rarity,
				inline: true
			})
			.setImage(data.images.large)
			.setTimestamp(new Date(data.set.releaseDate));

		return await interaction.followUp({ embeds: [Embed] });
	}
};
