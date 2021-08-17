import { Message } from 'discord.js'
import { AudioPlayerStatus,	StreamType,	createAudioPlayer, createAudioResource,	joinVoiceChannel } from '@discordjs/voice'
import ytdl from 'ytdl-core'

export async function play(queue: string[], message: Message) {
  if (queue[0] == undefined) return message.channel.send('Queue is emptry :no_entry_sign:')
  if (!message.member.voice.channel) return message.channel.send('You are not in channel :no_entry_sign:')

  global.connection = joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.guildId,
    adapterCreator: message.guild.voiceAdapterCreator,
  })

  const stream = ytdl(queue[0], { filter: 'audioonly' })
  const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary })
  const player = createAudioPlayer()

  let info = await ytdl.getInfo(queue[0])

  message.channel.send(`Starting playing: ${info.videoDetails.title} :musical_note:`)

  player.play(resource)
  global.connection.subscribe(player)

  player.on(AudioPlayerStatus.Idle, () => {
    if (queue == []) return global.connection.destroy()

    play(queue, message)
  })
}