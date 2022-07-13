import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";
import { GithubResponse } from "../../Interfaces/Github";
import axios from "axios";

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

		try {
			const response: GithubResponse = (
				await axios.get(`https://api.github.com/users/${encodeURI(user)}`)
			).data;

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setURL(response.html_url)
				.setThumbnail(response?.avatar_url)
				.addFields([
					{ name: "Type", value: response?.type, inline: true },
					{
						name: "Public repositories",
						value: response.public_repos.toString(),
						inline: true
					},
					{
						name: "Gists",
						value: response.public_gists.toString(),
						inline: true
					}
				])
				.setTimestamp(new Date(response.created_at));

			if (response.name == null) Embed.setTitle(response.login);
			if (response.name != null)
				Embed.setTitle(`${response.name} (${response.login})`);

			if (response.bio) Embed.setDescription(response.bio);
			if (response.location)
				Embed.addFields([
					{ name: "Location", value: response.location, inline: true }
				]);
			if (response.blog)
				Embed.addFields([{ name: "Blog", value: response.blog, inline: true }]);
			if (response.twitter_username)
				Embed.addFields([
					{
						name: "Twitter",
						value: `@${response.twitter_username}`,
						inline: true
					}
				]);

			return interaction.reply({ embeds: [Embed] });
		} catch {
			return interaction.reply({
				content: "User not found :no_entry_sign:",
				ephemeral: true
			});
		}
	}
};
