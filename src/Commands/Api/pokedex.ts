import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { calcWeaknesses } from "../../Exports/pokemonTypeChart";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
  name: "pokedex",
  description: "Get info about pokemon / move / ability / item",
  options: [
    {
      name: "type",
      description: "pokemon / move / ability / item",
      choices: [
        { name: "pokemon", value: "pokemon" },
        { name: "move", value: "move" },
        { name: "ability", value: "ability" },
        { name: "item", value: "item" }
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
    const requestType = interaction.options.getString("type");
    const request = interaction.options.getString("name");

    const { pokedexLocale } = await getLocale(interaction.guildId);

    if (requestType == "pokemon") {
      const script = (
        await axios.get<string>(
          "https://play.pokemonshowdown.com/data/pokedex.js"
        )
      ).data;

      eval(script);

      const response =
        exports.BattlePokedex[request.replace(/ |-/g, "").toLowerCase()];

      if (!response)
        return await interaction.reply({
          content: pokedexLocale.pokemon.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(pokedexLocale.pokemon.embedTitle(response.name, response.num))
        .setDescription(pokedexLocale.pokemon.types(response.types))
        .setThumbnail(
          `https://play.pokemonshowdown.com/sprites/ani/${response.name
            .replace(/ |-/g, "")
            .replace("Y", "y")
            .replace("X", "x")
            .toLowerCase()}.gif`
        )
        .addFields([
          {
            name: pokedexLocale.pokemon.height,
            value: response.heightm.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.weight,
            value: response.weightkg.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.totalStats,
            value: (
              response.baseStats.hp +
              response.baseStats.atk +
              response.baseStats.def +
              response.baseStats.spa +
              response.baseStats.spd +
              response.baseStats.spe
            ).toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.hp,
            value: response.baseStats.hp.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.atk,
            value: response.baseStats.atk.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.def,
            value: response.baseStats.def.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.spAtk,
            value: response.baseStats.spa.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.spDef,
            value: response.baseStats.spd.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.speed,
            value: response.baseStats.spe.toString(),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.abilities,
            value: Object.entries(response.abilities)
              .map((ability) =>
                ability[0] != "H" ? ability[1] : `(${ability[1]})`
              )
              .join("\n"),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.eggGroups,
            value: response.eggGroups.join("\n"),
            inline: true
          },
          {
            name: pokedexLocale.pokemon.weaknesses,
            value: calcWeaknesses(response.types)
              .sort((a, b) => b.scale - a.scale)
              .map((type) => `${type.name} x${type.scale}`)
              .join(", "),
            inline: true
          }
        ]);

      if (response.prevo != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.prevo,
            value: response.prevo,
            inline: true
          }
        ]);
      }

      if (response.evoLevel != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.evoLevel,
            value: response.evoLevel.toString(),
            inline: true
          }
        ]);
      }

      if (response.evoType != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.evoType,
            value: response.evoType,
            inline: true
          }
        ]);
      }

      if (response.evoCondition != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.evoCondition,
            value: response.evoCondition,
            inline: true
          }
        ]);
      }

      if (response.evoItem != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.evoItem,
            value: response.evoItem,
            inline: true
          }
        ]);
      }

      if (response.evos != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.evos,
            value: response.evos.join("\n"),
            inline: true
          }
        ]);
      }

      if (response.otherFormes != undefined) {
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.forms,
            value: response.otherFormes.join("\n"),
            inline: true
          }
        ]);
      }

      if (response.cannotDynamax)
        Embed.addFields([
          {
            name: pokedexLocale.pokemon.canDynamax,
            value: pokedexLocale.pokemon.yes,
            inline: true
          }
        ]);

      Embed.addFields([
        {
          name: pokedexLocale.pokemon.tier,
          value: response.tier,
          inline: true
        }
      ]);

      return await interaction.followUp({ embeds: [Embed] });
    }
    if (requestType == "move") {
      eval(
        (
          await axios.get(
            "https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/"
          )
        ).data
      );

      const response =
        exports.BattleMovedex[request.replace(/ |-/g, "").toLowerCase()];

      if (!response)
        return await interaction.reply({
          content: pokedexLocale.move.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(
          pokedexLocale.move.embedTitle(
            request.replace(/-/g, "").toLowerCase(),
            response.num
          )
        )
        .setDescription(response.shortDesc)
        .addFields([
          {
            name: pokedexLocale.move.type,
            value: response.type,
            inline: true
          },
          {
            name: pokedexLocale.move.category,
            value: response.category,
            inline: true
          },
          {
            name: pokedexLocale.move.basePower,
            value: response.basePower.toString(),
            inline: true
          },
          {
            name: pokedexLocale.move.accuracy,
            value: response.accuracy.toString(),
            inline: true
          },
          {
            name: pokedexLocale.move.pp,
            value: response.pp.toString(),
            inline: true
          },
          {
            name: pokedexLocale.move.priority,
            value: response.priority.toString(),
            inline: true
          }
        ]);
      return await interaction.followUp({ embeds: [Embed] });
    }

    if (requestType == "ability") {
      eval(
        (
          await axios.get(
            "https://play.pokemonshowdown.com/data/abilities.js?a222a0d9/"
          )
        ).data
      );

      const response =
        exports.BattleAbilities[request.replace(/ |-/g, "").toLowerCase()];

      if (!response)
        return await interaction.reply({
          content: pokedexLocale.ability.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(pokedexLocale.ability.embedTitle(response.name, response.num))
        .setDescription(response.shortDesc);

      return await interaction.followUp({ embeds: [Embed] });
    }

    if (requestType == "item") {
      eval(
        (
          await axios.get(
            "https://play.pokemonshowdown.com/data/items.js?3b87d391/"
          )
        ).data
      );

      const response =
        exports.BattleItems[request.replace(/ |-/g, "").toLowerCase()];

      if (!response)
        return await interaction.reply({
          content: pokedexLocale.item.invalid(request),
          ephemeral: true
        });

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(pokedexLocale.item.embedTitle(response.name, response.num))
        .setDescription(response.desc);

      return await interaction.followUp({ embeds: [Embed] });
    }
  }
};
