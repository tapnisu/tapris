import { Command } from "@Interfaces/index";
import { convert } from "html-to-text";

export const command: Command = {
	name: "html",
	description: "Convert html to text",
	options: [
		{
			name: "text",
			description: "Text to be decoded",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		await interaction.deferReply();

		const text = interaction.options.getString("text");

		const response: string = convert(text, { wordwrap: 130 });

		return await interaction.followUp(response);
	}
};
