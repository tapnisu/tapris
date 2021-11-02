import { CommandInteraction, MessageEmbed } from 'discord.js'
import {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	DiscordGatewayAdapterCreator
} from '@discordjs/voice'
import ytdl from 'ytdl-core'

export const play = async (client, interaction: CommandInteraction) => {
	if (client.music.queue.length == 0)
		return interaction.channel.send('Queue is empty :no_entry_sign:')
	if (!interaction.member.voice.channel)
		return interaction.channel.send('You are not in channel :no_entry_sign:')

	client.music.connection = joinVoiceChannel({
		channelId: interaction.member.voice.channel.id,
		guildId: interaction.guildId,
		adapterCreator: interaction.guild
			.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
	})

	const stream = ytdl(client.music.queue[0], { filter: 'audioonly' })
	const resource = createAudioResource(stream, {
		inputType: StreamType.Arbitrary
	})
	const player = createAudioPlayer()

	const info = await ytdl.getInfo(client.music.queue[0])

	const Embed = new MessageEmbed()
		.setColor(client.config.botColor)
		.setTitle(info.videoDetails.title)
		.setURL(info.videoDetails.video_url)
		.setDescription(info.videoDetails.description)
		.addFields(
			{
				name: 'Views',
				value: info.videoDetails.viewCount,
				inline: true
			},
			{
				name: 'Likes',
				value: `${info.videoDetails.likes} / ${info.videoDetails.dislikes}`,
				inline: true
			}
		)
		.setImage(info.videoDetails.thumbnails[0].url)
		.setTimestamp(new Date(info.videoDetails.publishDate))

	interaction.channel.send({ embeds: [Embed] })

	player.play(resource)
	client.music.connection.subscribe(player)

	player.on(AudioPlayerStatus.Idle, () => {
		client.music.queue.shift()

		if (client.music.queue.length == 0) return client.music.connection.destroy()

		return play(client, interaction)
	})
}
