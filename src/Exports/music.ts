import { CommandInteraction, GuildMember, MessageEmbed } from 'discord.js'
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
	const member: GuildMember = interaction.member as GuildMember

	if (
		client.music.queue[interaction.guildId] == undefined ||
		client.music.queue[interaction.guildId] == []
	)
		return interaction.channel.send('Queue is empty :no_entry_sign:')
	if (!member.voice.channel)
		return interaction.channel.send('You are not in channel :no_entry_sign:')

	client.music.connection = joinVoiceChannel({
		channelId: member.voice.channel.id,
		guildId: interaction.guildId,
		adapterCreator: interaction.guild
			.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
	})

	const stream = ytdl(client.music.queue[interaction.guildId][0], {
		filter: 'audioonly'
	})
	const resource = createAudioResource(stream, {
		inputType: StreamType.Arbitrary
	})
	const player = createAudioPlayer()

	const info = await ytdl.getInfo(client.music.queue[interaction.guildId][0])

	// Get length as string
	const date = new Date(0)
	date.setSeconds(Number(info.videoDetails.lengthSeconds))
	const timeString = date.toISOString().substr(11, 8)

	const Embed = new MessageEmbed()
		.setColor(client.env.BOT_COLOR)
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
				value: String(info.videoDetails.likes),
				inline: true
			},
			{
				name: 'Length',
				value: timeString,
				inline: true
			}
		)
		.setImage(info.videoDetails.thumbnails.at(-1).url)
		.setTimestamp(new Date(info.videoDetails.publishDate))

	interaction.channel.send({ embeds: [Embed] })

	player.play(resource)
	client.music.connection.subscribe(player)

	player.on(AudioPlayerStatus.Idle, () => {
		client.music.queue.shift()

		if (client.music.queue[interaction.guildId] == [])
			return client.music.connection.destroy()

		return play(client, interaction)
	})
}
