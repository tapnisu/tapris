import { Button, Command, Event } from "../Interfaces";

import { Interaction } from "discord.js";

export const event: Event = {
	name: "interactionCreate",
	run: (client, interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (command) (command as Command).run(client, interaction);

			return;
		}

		if (interaction.isButton()) {
			const button = client.buttons.find((button) =>
				button.customId.test(interaction.customId)
			);
			if (button) (button as Button).run(client, interaction);
		}
	}
};
