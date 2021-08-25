import { Command } from '../../Interfaces'
import { ColorResolvable, MessageAttachment, MessageEmbed } from 'discord.js'
import { createCanvas } from 'canvas'

export const command: Command = {
  name: 'color',
  description: 'Shows color or generates color',
  aliases: ['color / random'],
  run: async (client, message, args) => {  
    let colorString = args.join('')

    if (colorString == '') return message.channel.send('Args are empty!')
    if (colorString == 'random') {
      let hexCharset = 'ABCDEF0123456789'

      colorString = '#'
      for (let i = 0, n = hexCharset.length; i < 6; ++i) {
        colorString += hexCharset.charAt(Math.floor(Math.random() * n))
      }
    }

    let canvas = createCanvas(500, 500)
    let ctx = canvas.getContext('2d')

    ctx.fillStyle = colorString
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = '30px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(colorString, 250, 200)
    ctx.font = '30px Arial'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.fillText(colorString, 250, 300)

    const attachment: MessageAttachment = new MessageAttachment(canvas.toBuffer(), 'ColorHexSend.png')

    const Embed = new MessageEmbed()
      .setTitle(colorString)
      .setImage('attachment://ColorHexSend.png')
    
    try {
      Embed.setColor(colorString as ColorResolvable)
    } catch {
      Embed.setColor(client.config.botColor)
    }  
    
    return message.channel.send({ embeds: [Embed], files: [attachment] })
  }
}