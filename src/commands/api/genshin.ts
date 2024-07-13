// TODO: Update everything to genshin-db v5
import type { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import { EmbedBuilder } from "discord.js";
import genshindb from "genshin-db";

genshindb.setOptions({
  queryLanguages: [genshindb.Language.English, genshindb.Language.Russian],
  // @ts-expect-error: v4 types are not in genshin-db v5
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

      const embed = new EmbedBuilder()
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
            // @ts-expect-error: v4 types are not in genshin-db v5
            value: character.element,
            inline: true
          },
          {
            name: genshinLocale.character.weapontype,
            // @ts-expect-error: v4 types are not in genshin-db v5
            value: character.weapontype,
            inline: true
          },
          {
            name: genshinLocale.character.substat,
            // @ts-expect-error: v4 types are not in genshin-db v5
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

      return await interaction.followUp({ embeds: [embed] });
    }

    if (requestType == "weapon") {
      const weapon = genshindb.weapons(request);

      if (!weapon)
        return await interaction.reply({
          content: genshinLocale.weapon.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(weapon.name)
        // @ts-expect-error: v4 types are not in genshin-db v5
        .setDescription(weapon.effect)
        .setThumbnail(
          `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/${weapon.images.filename_icon}.png`
        )
        .addFields([
          {
            name: genshinLocale.weapon.rarity,
            value: ":star:".repeat(Number(weapon.rarity)),
            inline: true
          },
          {
            // @ts-expect-error: v4 types are not in genshin-db v5
            name: weapon.effectname,
            // @ts-expect-error: v4 types are not in genshin-db v5
            value: weapon.effect,
            inline: true
          },
          {
            name: genshinLocale.weapon.type,
            // @ts-expect-error: v4 types are not in genshin-db v5
            value: weapon.weapontype,
            inline: true
          },
          {
            // @ts-expect-error: v4 types are not in genshin-db v5
            name: weapon.substat,
            // @ts-expect-error: v4 types are not in genshin-db v5
            value: weapon.subvalue,
            inline: true
          },
          {
            name: genshinLocale.weapon.baseatk,
            // @ts-expect-error: v4 types are not in genshin-db v5
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

      return await interaction.followUp({ embeds: [embed] });
    }

    if (requestType == "artifact") {
      const artifact = genshindb.artifacts(request);

      if (!artifact)
        return await interaction.reply({
          content: genshinLocale.artifact.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(artifact.name)
        .setDescription(
          artifact.flower
            ? artifact.flower.description
            : artifact.circlet.description
        )
        .setThumbnail(
          artifact.images.mihoyo_flower ?? artifact.images.mihoyo_circlet
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

      return await interaction.followUp({ embeds: [embed] });
    }
  }
};
