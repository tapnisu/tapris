import {
	AudioPlayer,
	AudioPlayerStatus,
	createAudioResource,
	StreamType,
	VoiceConnection
} from "@discordjs/voice";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import ytdl from "ytdl-core";
import Client from "../Core/index";

export class Music {
	public queue: string[];
	public connection: VoiceConnection | null;
	public player: AudioPlayer;

	constructor(queue: string[], connection: VoiceConnection | null) {
		this.queue = queue;
		this.connection = connection;
		this.player = new AudioPlayer();
	}
}

export const play = async (
	client: Client,
	interaction: CommandInteraction,
	music: Music
) => {
	if (client.music.get(interaction.guildId).queue.length == 0)
		return await interaction.followUp({
			content: "The queue is empty!"
		});

	const stream = ytdl(music.queue[0], {
		filter: "audioonly"
	});
	const resource = createAudioResource(stream, {
		inputType: StreamType.Arbitrary
	});

	const info = await ytdl.getInfo(music.queue[0]);

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

	await interaction.followUp({ embeds: [Embed] });

	music.player.play(resource);
	music.connection.subscribe(music.player);

	music.player.on(AudioPlayerStatus.Idle, () => {
		music.queue.shift();

		play(client, interaction, music);
	});

	music.player.on("error", async () => {
		music.player.stop();

		await interaction.followUp("Unknown error happened! :interrobang:");
	});
};
