import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { GithubResponse } from "../../interfaces/Github.js";
import { Command } from "../../interfaces/index.js";
import getLocale from "../../locales/index.js";

export const command: Command = {
  name: "github",
  description: "Get data from Github",
  options: [
    {
      name: "user",
      description: "User to be shown",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getString("user");
    const { githubLocale } = await getLocale(interaction.guildId);

    let response: GithubResponse;

    try {
      response = (
        await axios.get(`https://api.github.com/users/${encodeURI(user)}`)
      ).data;
    } catch {
      return await interaction.reply({
        content: githubLocale.notFound(user),
        ephemeral: true
      });
    }

    await interaction.deferReply();

    const Embed = new EmbedBuilder()
      .setTitle(
        response.name ? `${response.name} (${response.login})` : response.login
      )
      .setColor(client.env.BOT_COLOR)
      .setURL(response.html_url)
      .setThumbnail(response?.avatar_url)
      .addFields([
        { name: githubLocale.type, value: response?.type, inline: true },
        {
          name: githubLocale.public_repos,
          value: response.public_repos.toString(),
          inline: true
        },
        {
          name: githubLocale.gists,
          value: response.public_gists.toString(),
          inline: true
        }
      ])
      .setTimestamp(new Date(response.created_at));

    if (response.bio) Embed.setDescription(response.bio);
    if (response.location)
      Embed.addFields([
        { name: githubLocale.location, value: response.location, inline: true }
      ]);
    if (response.blog)
      Embed.addFields([
        { name: githubLocale.blog, value: response.blog, inline: true }
      ]);
    if (response.twitter_username)
      Embed.addFields([
        {
          name: githubLocale.twitter,
          value: `@${response.twitter_username}`,
          inline: true
        }
      ]);

    return await interaction.followUp({ embeds: [Embed] });
  }
};
