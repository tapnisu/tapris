import { Button, Command, Event } from "@Interfaces/index";
import { Interaction, InteractionType } from "discord.js";

export const event: Event = {
	name: "interactionCreate",
	run: (client, interaction: Interaction) => {
		if (interaction.type === InteractionType.ApplicationCommand) {
			if (interaction.isChatInputCommand()) {
				const command = client.commands.get(interaction.commandName);
				if (command) {
					if (command.guildsOnly && !interaction.guild)
						return interaction.reply({
							content: "You can use this command only in guilds!",
							ephemeral: true
						});

					return (command as Command).run(client, interaction);
				}
			}
		}

		if (interaction.type === InteractionType.MessageComponent) {
			if (interaction.isButton()) {
				const button = client.buttons.find((button) =>
					button.customId.test(interaction.customId)
				);
				if (button) return (button as Button).run(client, interaction);
			}
		}
	}
};
