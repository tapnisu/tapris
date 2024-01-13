import { Message, TextChannel } from "discord.js";
import { Event } from "../Interfaces";

const formatSize = (length: number) => {
  let i = 0;
  const type = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB"];

  while ((length / 1024) | 0 && i < type.length - 1) {
    length /= 1024;

    i++;
  }

  return length.toFixed(2) + " " + type[i];
};

export const event: Event = {
  name: "messageCreate",
  run: (client, message: Message) => {
    const date = new Date().toLocaleString("en-US", {
      day: "2-digit",
      year: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const channel = message.channel as TextChannel;

    console.log(
      `[${date}] [${message.guild.name} / ${channel.name} / ${message.author.tag}]: ${message.content}`
    );

    let allEmbeds: string[] = [];

    message.embeds.forEach((embed) => {
      let stringEmbed = "Embed:\n";

      if (embed.title) stringEmbed += `  Title: ${embed.data.title}\n`;
      if (embed.description)
        stringEmbed += `  Description: ${embed.data.description}\n`;
      if (embed.url) stringEmbed += `  Url: ${embed.data.url}\n`;
      if (embed.color) stringEmbed += `  Color: ${embed.data.color}\n`;
      if (embed.timestamp) stringEmbed += `  Url: ${embed.data.timestamp}\n`;

      let allFields = ["  Fields:\n"];

      embed.data.fields?.forEach((field) => {
        let stringField = "    Field:\n";

        if (field.name) stringField += `      Name: ${field.name}\n`;
        if (field.value) stringField += `      Value: ${field.value}\n`;

        allFields = [...allFields, stringField];
      });

      if (allFields.length != 1) stringEmbed += `${allFields.join("")}`;
      if (embed.data.thumbnail)
        stringEmbed += `  Thumbnail: ${embed.thumbnail.url}\n`;
      if (embed.data.image)
        stringEmbed += `  Image: ${embed.data.image?.url}\n`;
      if (embed.data.video)
        stringEmbed += `  Video: ${embed.data.video?.url}\n`;
      if (embed.data.author)
        stringEmbed += `  Author: ${embed.data.author?.name}\n`;
      if (embed.data.footer)
        stringEmbed += `  Footer: ${embed.data.footer?.icon_url}\n`;

      allEmbeds = [...allEmbeds, stringEmbed];
    });

    if (allEmbeds.length != 0) console.log(allEmbeds.join(""));

    let allAttachments: string[] = [];

    message.attachments.forEach((attachment) => {
      allAttachments = [
        ...allAttachments,
        `Attachment:\n  Name: ${attachment.name}\n${
          attachment.description
            ? `	Description: ${attachment.description}\n`
            : ""
        }  Size: ${formatSize(attachment.size)}\n  Url: ${attachment.url}`
      ];
    });

    if (allAttachments.length != 0) console.log(allAttachments.join(""));
  }
};
