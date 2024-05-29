import { GithubResponse } from "#interfaces/github.js";
import { Command } from "#interfaces/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

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
  run: async (client, interaction, i18n) => {
    const user = interaction.options.getString("user");

    await interaction.deferReply();

    const res = await axios.get<GithubResponse>(
      `https://api.github.com/users/${encodeURI(user)}`
    );

    const embed = new EmbedBuilder()
      .setTitle(
        res.data.name ? `${res.data.name} (${res.data.login})` : res.data.login
      )
      .setDescription(res.data.bio)
      .setColor(client.env.BOT_COLOR)
      .setURL(res.data.html_url)
      .setThumbnail(res.data?.avatar_url)
      .addFields(
        { name: i18n.__("github_type"), value: res.data?.type, inline: true },
        {
          name: i18n.__("github_publicRepos"),
          value: res.data.public_repos.toString(),
          inline: true
        },
        {
          name: i18n.__("github_gists"),
          value: res.data.public_gists.toString(),
          inline: true
        }
      )
      .setTimestamp(new Date(res.data.created_at));

    if (res.data.bio) embed.setDescription(res.data.bio);
    if (res.data.location)
      embed.addFields({
        name: i18n.__("github_location"),
        value: res.data.location,
        inline: true
      });
    if (res.data.blog)
      embed.addFields({
        name: i18n.__("github_blog"),
        value: res.data.blog,
        inline: true
      });
    if (res.data.twitter_username)
      embed.addFields({
        name: i18n.__("github_twitter"),
        value: `@${res.data.twitter_username}`,
        inline: true
      });

    return await interaction.followUp({ embeds: [embed] });
  }
};
