import { Button } from "@Interfaces/index";

export const button: Button = {
	customId: /delete_message/,
	run: async (client, interaction) => {
		return interaction.message.delete();
	}
};
