import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
  name: 'github',
  description: 'Get data from Github',
  aliases: ['name'],
  run: async (client, message, args) => {
    let response = await (await fetch(`https://api.github.com/users/${args.join('%20')}`)).json()
    const Embed = new MessageEmbed()
      .setColor(client.config.botColor as ColorResolvable)
      .setTitle(response.name)
      .setURL(response.html_url)
      .setDescription(response.login)
      .setThumbnail(response.avatar_url)
      .addFields(
        { name: 'Bio', value: response.bio, inline: true },
        { name: 'Type', value: response.type, inline: true },
        { name: 'Public repositories', value: response.public_repos, inline: true },
        { name: 'Gists', value: response.public_gists, inline: true },
        { name: 'Location', value: response.location, inline: true },            
        { name: 'Twitter', value: response.twitter_username, inline: true },  
        { name: 'Blog', value: response.blog, inline: true },
        { name: 'Created at', value: response.created_at, inline: true }
      )
      .setTimestamp()
    
    return message.channel.send({ embeds: [Embed] })
  }
}