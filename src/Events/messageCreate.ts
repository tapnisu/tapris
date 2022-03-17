import { Event } from '../Interfaces'
import { Message, TextChannel } from 'eris'

export const event: Event = {
	name: 'messageCreate',
	run: (client, message: Message) => {
		const date = new Date().toLocaleString('en-US', {
			day: '2-digit',
			year: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})

		const channel = message.channel as TextChannel

		/*console.log(
			`[${date}] [${message.guild.name} / ${channel.name} / ${message.author.tag}]: ${message.content}`
		)*/

		let allEmbeds = []

		message.embeds.forEach((embed) => {
			let stringEmbed = 'Embed:\n'

			if (embed.title) stringEmbed += `  Title: ${embed.title}\n`
			if (embed.description)
				stringEmbed += `  Description: ${embed.description}\n`
			if (embed.url) stringEmbed += `  Url: ${embed.url}\n`
			if (embed.color) stringEmbed += `  Color: ${embed.color}\n`
			if (embed.timestamp) stringEmbed += `  Url: ${embed.timestamp}\n`

			let allFields = ['  Fields:\n']

			embed.fields.forEach((field) => {
				let stringField = '    Field:\n'

				if (field.name) stringField += `      Name: ${field.name}\n`
				if (field.value) stringField += `      Value: ${field.value}\n`

				allFields = [...allFields, stringField]
			})

			if (allFields.length != 1) stringEmbed += `${allFields.join('')}`
			if (embed.thumbnail)
				stringEmbed += `  Thumbnail: ${embed.thumbnail.url}\n`
			if (embed.image) stringEmbed += `  Image: ${embed.image.url}\n`
			if (embed.video) stringEmbed += `  Video: ${embed.video.url}\n`
			if (embed.author) stringEmbed += `  Author: ${embed.author.name}\n`
			if (embed.footer) stringEmbed += `  Footer: ${embed.footer.iconURL}\n`

			allEmbeds = [...allEmbeds, stringEmbed]
		})

		if (allEmbeds.length != 0) console.log(allEmbeds.join(''))
	}
}
