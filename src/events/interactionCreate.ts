import { getGuild } from "#db/index.js";
import { Command, Component, Event } from "#interfaces/index.js";
import { Interaction, InteractionType } from "discord.js";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction: Interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if (command.guildsOnly && !interaction.guild)
          return interaction.reply({
            content: "You can use this command only in guilds!",
            ephemeral: true
          });

        const guild = await getGuild(interaction.guildId);
        client.i18n.setLocale(guild.lang);

        return (command as Command)
          .run(client, interaction, client.i18n)
          .catch(async (err) => {
            console.error(err);

            await interaction.followUp({
              content: client.i18n.__("unknown-error"),
              ephemeral: true
            });
          });
      }
    }

    if (interaction.type === InteractionType.MessageComponent) {
      if (interaction.isButton()) {
        const component = client.components.find((button) =>
          button.customId.test(interaction.customId)
        );

        if (!component) return;

        const guild = await getGuild(interaction.guildId);
        client.i18n.setLocale(guild.lang);

        return (component as Component)
          .run(client, interaction, client.i18n)
          .catch(async (err) => {
            console.error(err);

            await interaction.followUp({
              content: client.i18n.__("unknown-error"),
              ephemeral: true
            });
          });
      }
    }
  }
};
