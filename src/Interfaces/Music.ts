import { VoiceConnection } from '@discordjs/voice'

export interface Music {
	queue: string[]
	connection: VoiceConnection
}
