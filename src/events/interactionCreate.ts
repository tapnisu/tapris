import { Interaction, InteractionType } from "discord.js";
import { Command, Component, Event } from "../interfaces/index.js";
import getLocale from "../locales/index.js";

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

          return (command as Command)
            .run(client, interaction)
            .catch(async (err) => {
              console.error(err);

              const { errorLocale } = await getLocale(interaction.guildId);

              await interaction.followUp({
                content: errorLocale.unknownError,
                ephemeral: true
              });
            });
        }
      }
    }

    if (interaction.type === InteractionType.MessageComponent) {
      if (interaction.isButton()) {
        const component = client.components.find((button) =>
          button.customId.test(interaction.customId)
        );

        if (component)
          return (component as Component)
            .run(client, interaction)
            .catch(async (err) => {
              console.error(err);

              const { errorLocale } = await getLocale(interaction.guildId);

              await interaction.reply({
                content: errorLocale.unknownError,
                ephemeral: true
              });
            });
      }
    }
  }
};
