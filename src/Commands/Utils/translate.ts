import translate from "@iamtraction/google-translate";
import { Command } from "@Interfaces/index";
import { EmbedBuilder } from "discord.js";
import getLocale from "../../Locales";

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

		const { translateLocale } = await getLocale(interaction.guildId);

		try {
			response = await translate(text, { to: language });
		} catch {
			return await interaction.reply({
				content: translateLocale.invalidLanguage,
				ephemeral: true
			});
		}

		await interaction.deferReply();

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(translateLocale.textIn(language))
			.setDescription(response.text)
			.addFields([
				{
					name: translateLocale.origLang,
					value: response.from.language.iso,
					inline: true
				},
				{
					name: translateLocale.origMessage,
					value: text,
					inline: true
				}
			])
			.setTimestamp();

		return await interaction.followUp({ embeds: [Embed] });
	}
};
