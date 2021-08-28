import { Message, MessageEmbed } from 'discord.js'
import {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel
} from '@discordjs/voice'
import ytdl from 'ytdl-core'

export async function play(queue: string[], message: Message, client) {
	if (queue[0] == undefined)
		return message.channel.send('Queue is emptry :no_entry_sign:')
	if (!message.member.voice.channel)
		return message.channel.send('You are not in channel :no_entry_sign:')

	global.connection = joinVoiceChannel({
		channelId: message.member.voice.channel.id,
		guildId: message.guildId,
		adapterCreator: message.guild.voiceAdapterCreator
	})

	const stream = ytdl(queue[0], { filter: 'audioonly' })
	const resource = createAudioResource(stream, {
		inputType: StreamType.Arbitrary
	})
	const player = createAudioPlayer()

	let info = await ytdl.getInfo(queue[0])

	const Embed = new MessageEmbed()
		.setColor(client.config.botColor)
		.setTitle(info.videoDetails.title)
		.setURL(info.videoDetails.video_url)
		.setDescription(info.videoDetails.description)
		.addFields(
			{
				name: 'Likes',
				value: info.videoDetails.likes.toString(),
				inline: true
			},
			{
				name: 'Dislikes',
				value: info.videoDetails.dislikes.toString(),
				inline: true
			}
		)
		.setImage(info.videoDetails.thumbnails[0].url as unknown as string)
		.setTimestamp()

	message.channel.send({ embeds: [Embed] })

	player.play(resource)
	global.connection.subscribe(player)

	player.on(AudioPlayerStatus.Idle, () => {
		queue.shift()

		if (queue.length == 0) return global.connection.destroy()

		play(queue, message, client)
	})
}
