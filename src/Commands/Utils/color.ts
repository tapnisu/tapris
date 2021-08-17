import { Command } from '../../Interfaces'
import { ColorResolvable, MessageAttachment, MessageEmbed } from 'discord.js'
import { createCanvas } from 'canvas'

export const command: Command = {
  name: 'color',
  description: 'Shows color or generates color',
  aliases: ['color / random'],
  run: async (client, message, args) => {
    let canvas = createCanvas(500, 500)
    let ctx = canvas.getContext('2d')

    let hexCharset = 'ABCDEF0123456789'
    let colorHex = args.join('')
    if (colorHex === 'random') {
      colorHex = '#'
      for (let i = 0, n = hexCharset.length; i < 6; ++i) {
        colorHex += hexCharset.charAt(Math.floor(Math.random() * n))
      }
    }

    ctx.fillStyle = colorHex
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = '30px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(colorHex, 250, 200)
    ctx.font = '30px Arial'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.fillText(colorHex, 250, 300)

    const attachment: MessageAttachment = new MessageAttachment(canvas.toBuffer(), 'ColorHexSend.png')

    const Embed = new MessageEmbed()
      .setColor(colorHex as ColorResolvable)
      .setTitle(colorHex)      
      .setImage('attachment://ColorHexSend.png')
    
    return message.channel.send({ embeds: [Embed], files: [attachment] })
  }
}