import { ColorResolvable } from 'discord.js'

export interface Config {
  token: string
  prefix: string
  developerId: string
  webLink: string,
  botColor: ColorResolvable,
  starEmoji: string,
  warframeLanguage: string
}