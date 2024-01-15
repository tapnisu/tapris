import { EmbedBuilder } from "discord.js";
import genshindb from "genshin-db";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

genshindb.setOptions({
  queryLanguages: [genshindb.Language.English, genshindb.Language.Russian],
  v4Props: true
});

export const command: Command = {
  name: "genshin",
  description: "Get info about character / weapon / artifacts set",
  options: [
    {
      name: "type",
      description: "character / weapon / artifact",
      choices: [
        { name: "character", value: "character" },
        { name: "weapon", value: "weapon" },
        { name: "artifact", value: "artifact" }
      ],
      type: 3,
      required: true
    },
    {
      name: "name",
      description: "Name of target",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    const requestType: string = interaction.options.getString("type");
    const request: string = encodeURI(
      interaction.options
        .getString("name")
        .replace(/ /g, "")
        .toLocaleLowerCase()
    );

    const { genshinLocale } = await getLocale(interaction.guildId);

    if (requestType == "character") {
      const character = genshindb.characters(request);

      if (!character)
        return await interaction.reply({
          content: genshinLocale.character.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(character.name)
        .setDescription(character.description)
        .setThumbnail(`https://api.genshin.dev/characters/${request}/icon.png`)
        .addFields([
          {
            name: genshinLocale.character.rarity,
            value: ":star:".repeat(Number(character.rarity)),
            inline: true
          },
          {
            name: genshinLocale.character.nation,
            value: character.region,
            inline: true
          },
          {
            name: genshinLocale.character.affiliation,
            value: character.affiliation,
            inline: true
          },
          {
            name: genshinLocale.character.birthday,
            value: character.birthday,
            inline: true
          },
          {
            name: genshinLocale.character.constellation,
            value: character.constellation,
            inline: true
          },
          {
            name: genshinLocale.character.element,
            value: character.element,
            inline: true
          },
          {
            name: genshinLocale.character.weapontype,
            value: character.weapontype,
            inline: true
          },
          {
            name: genshinLocale.character.substat,
            value: character.substat,
            inline: true
          },
          {
            name: genshinLocale.character.version,
            value: character.version,
            inline: true
          }
        ])
        .setImage(
          `https://api.genshin.dev/characters/${request}/gacha-splash.png`
        );

      console.log(character.images.filename_gachaSplash);

      if (character.url?.fandom) Embed.setURL(character.url.fandom);

      return await interaction.followUp({ embeds: [Embed] });
    }

    if (requestType == "weapon") {
      const weapon = genshindb.weapons(request);

      if (!weapon)
        return await interaction.reply({
          content: genshinLocale.weapon.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(weapon.name)
        .setDescription(weapon.effect)
        .setThumbnail(
          `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/${weapon.images.icon}.png`
        )
        .addFields([
          {
            name: genshinLocale.weapon.rarity,
            value: ":star:".repeat(Number(weapon.rarity)),
            inline: true
          },
          {
            name: weapon.effectname,
            value: weapon.effect,
            inline: true
          },
          {
            name: genshinLocale.weapon.type,
            value: weapon.weapontype,
            inline: true
          },
          {
            name: weapon.substat,
            value: weapon.subvalue,
            inline: true
          },
          {
            name: genshinLocale.weapon.baseatk,
            value: weapon.baseatk.toString(),
            inline: true
          },
          {
            name: genshinLocale.weapon.version,
            value: weapon.version,
            inline: true
          }
        ])
        .setImage(
          `https://res.cloudinary.com/genshin/image/upload/sprites/${weapon.images.filename_gacha}.png`
        );

      return await interaction.followUp({ embeds: [Embed] });
    }

    if (requestType == "artifact") {
      const artifact = genshindb.artifacts(request);

      if (!artifact)
        return await interaction.reply({
          content: genshinLocale.artifact.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(artifact.name)
        .setDescription(
          artifact.flower
            ? artifact.flower.description
            : artifact.circlet.description
        )
        .setThumbnail(
          artifact.flower
            ? `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/${artifact.images.flower}.png`
            : `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/${artifact.images.circlet}.png`
        )
        .addFields([
          {
            name: genshinLocale.artifact.rarity,
            value: ":star:".repeat(artifact.rarityList.at(-1)),
            inline: true
          },
          {
            name: genshinLocale.artifact.pc2,
            value: artifact["2pc"] ? artifact["2pc"] : "None",
            inline: true
          },
          {
            name: genshinLocale.artifact.pc4,
            value: artifact["4pc"] ? artifact["4pc"] : "None",
            inline: true
          }
        ]);

      if (artifact.url?.fandom) Embed.setURL(artifact.url.fandom);

      return await interaction.followUp({ embeds: [Embed] });
    }
  }
};
