import { Command } from '../../Interfaces'

export const command: Command = {
  name: 'password',
  description: 'Password generator',
  aliases: [],
  run: async (client, message, args) => {
    let charset: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let password: string = ''

    for (let i = 0, n = charset.length; i < 8; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n))
    }

    return message.channel.send(`Password: ||${password}|| :keyboard:`)
  }
}