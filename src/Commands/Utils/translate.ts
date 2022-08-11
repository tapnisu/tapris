import translate from "@iamtraction/google-translate";
import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "translate",
	description: "Translates text",
	options: [
		{
			name: "language",
			description: "Target language",
			type: 3,
			required: true
		},
		{
			name: "text",
			description: "Text to be translated",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const language = interaction.options.getString("language");
		const text = interaction.options.getString("text");
		let response: any;

		try {
			response = await translate(text, { to: language });
		} catch {
			return await interaction.reply({
				content: "Error, language is not valid :no_entry_sign:",
				ephemeral: true
			});
		}

		await interaction.deferReply();

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(`Text in ${language}`)
			.setDescription(response.text)
			.addFields([
				{
					name: "Original language",
					value: response.from.language.iso,
					inline: true
				},
				{
					name: "Original message",
					value: text,
					inline: true
				}
			])
			.setTimestamp();

		return await interaction.followUp({ embeds: [Embed] });
	}
};
