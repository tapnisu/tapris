import { CommandInteraction, GuildMember, EmbedBuilder } from "discord.js";
import {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	DiscordGatewayAdapterCreator
} from "@discordjs/voice";
import ytdl from "ytdl-core";

export const play = async (client, interaction: CommandInteraction) => {
	const member: GuildMember = interaction.member as GuildMember;

	if (
		!client.music.queue[interaction.guildId] ||
		client.music.queue[interaction.guildId].length == 0
	)
		return interaction.editReply("Queue is empty :no_entry_sign:");
	if (!member.voice.channel)
		return interaction.editReply("You are not in channel :no_entry_sign:");

	client.music.connection = joinVoiceChannel({
		channelId: member.voice.channel.id,
		guildId: interaction.guildId,
		adapterCreator: interaction.guild
			.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
	});

	const stream = ytdl(client.music.queue[interaction.guildId][0], {
		filter: "audioonly"
	});
	const resource = createAudioResource(stream, {
		inputType: StreamType.Arbitrary
	});
	const player = createAudioPlayer();

	const info = await ytdl.getInfo(client.music.queue[interaction.guildId][0]);

	// Get length as string
	const date = new Date(0);
	date.setSeconds(Number(info.videoDetails.lengthSeconds));
	const timeString = date.toISOString().substr(11, 8);

	const Embed = new EmbedBuilder()
		.setColor(client.env.BOT_COLOR)
		.setTitle(info.videoDetails.title)
		.setURL(info.videoDetails.video_url)
		.setDescription(
			info.videoDetails.description
				? info.videoDetails.description
				: "No description provided"
		)
		.addFields([
			{
				name: "Views",
				value: info.videoDetails.viewCount,
				inline: true
			},
			{
				name: "Likes",
				value: String(info.videoDetails.likes),
				inline: true
			},
			{
				name: "Length",
				value: timeString,
				inline: true
			}
		])
		.setImage(info.videoDetails.thumbnails.at(-1).url)
		.setTimestamp(new Date(info.videoDetails.publishDate));

	await interaction.editReply({ embeds: [Embed] });

	player.play(resource);
	client.music.connection.subscribe(player);

	player.on(AudioPlayerStatus.Idle, () => {
		client.music.queue[interaction.guildId].shift();

		play(client, interaction);
	});

	player.on("error", () => {
		interaction.editReply("Unknown error happened! :interrobang:");
	});
};
