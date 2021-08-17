import { Command } from '../../Interfaces'
import fetch from 'node-fetch'

export const command: Command = {
  name: 'cat',
  description: 'Get cat text',
  aliases: [],
  run: async (client, message, args) => {
    let response = await (await fetch('https://nekos.life/api/v2/cat')).json()

    return message.channel.send(response.cat)
  }
}