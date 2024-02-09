import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces/index.js";

export const command: Command = {
  name: "help",
  description: "Get info about commands",
  options: [
    {
      name: "command",
      description: "Name of command to get info",
      type: 3,
      required: false
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();

    const request = interaction.options.getString("command");
    const command = client.commands.get(request);

    if (command) {
      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(command.name)
        .setDescription(command.description);

      command.options.forEach((option) => {
        Embed.addFields([
          {
            name: `${option.name}`,
            value: option.description ?? "-",
            inline: true
          }
        ]);
      });

      return await interaction.followUp({ embeds: [Embed] });
    }

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(client.user.username)
      .setThumbnail(client.user.displayAvatarURL({ forceStatic: false }))
      .setDescription(
        client.commands
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(
            (command) =>
              `\`/${command.name}${
                command.options && command.options.length > 0
                  ? command.options
                    ? " " +
                      command.options
                        .map(
                          (option) => `<${option.name} [${option.description}]>`
                        )
                        .join(" ")
                    : ""
                  : ""
              }\` - ${command.description}`
          )
          .join("\n")
      );

    return await interaction.followUp({ embeds: [embed] });
  }
};
