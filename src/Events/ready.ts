import { Event } from '../Interfaces'

global.queue = []

export const event: Event = {
  name: 'ready',
  run: (client) => {
    console.log(`${client.user.tag} is up!`)
    client.user.setActivity(`${client.config.prefix}help - help`)
  }
}