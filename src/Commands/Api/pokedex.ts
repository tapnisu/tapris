import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
  name: 'pokedex',
  description: 'Get info about pokemon / atack / ability / item',
  aliases: ['name'],
  run: async (client, message, args) => {
    let response, gmax
    
    let script = await (await fetch('https://play.pokemonshowdown.com/data/pokedex.js?4076b733/')).text()

    eval(script)

    if (parseInt(args[0]).toString() === args[0]) {
      for (let i in Object.keys(exports.BattlePokedex)) {
        if (exports.BattlePokedex[Object.keys(exports.BattlePokedex)[i]].num.toString() == args[0]) {
          response = exports.BattlePokedex[Object.keys(exports.BattlePokedex)[i]]
          break
        }
      }
    } else {
      response = exports.BattlePokedex[args.join('').split('-').join('').toLowerCase()]
    }

    if (response) {
      const Embed = new MessageEmbed()
        .setColor(client.config.botColor)
        .setTitle(`Name: ${response.name}, ID: ${response.num}`)
        .setDescription(`Types: ${response.types.join(' / ')}`)
        .setThumbnail(`https://play.pokemonshowdown.com/sprites/ani/${response.name.replace('-Y', 'y').replace('-X', 'x').toLowerCase()}.gif`)
        .addFields({
          name: 'Height (m)',
          value: response.heightm,
          inline: true
        }, {
          name: 'Weight (kg)',
          value: response.weightkg,
          inline: true
        }, {
          name: 'Total',
          value: response.baseStats.hp + response.baseStats.atk + response.baseStats.def + response.baseStats.spa + response.baseStats.spd + response.baseStats.spe,
          inline: true
        }, {
          name: 'HP',
          value: response.baseStats.hp,
          inline: true
        }, {
          name: 'ATK',
          value: response.baseStats.atk,
          inline: true
        }, {
          name: 'DEF',
          value: response.baseStats.def,
          inline: true
        }, {
          name: 'SPATK',
          value: response.baseStats.spa,
          inline: true
        }, {
          name: 'SPDEF',
          value: response.baseStats.spd,
          inline: true
        }, {
          name: 'SPEED',
          value: response.baseStats.spe,
          inline: true
        }, {
          name: 'Abilities',
          value: response.abilities.join('\n'),
          inline: true
        }, {
          name: 'Egg groups',
          value: response.eggGroups.join('\n'),
          inline: true
        })

      if (response.prevo != undefined) {
        Embed.addFields({
          name: 'Prevo',
          value: response.prevo,
          inline: true
        })
      }
      if (response.evoLevel != undefined) {
        Embed.addFields({
          name: 'Evo Level',
          value: response.evoLevel,
          inline: true
        })
      }
      if (response.evoType != undefined) {
        Embed.addFields({
          name: 'Evo type',
          value: response.evoType,
          inline: true
        })
      }
      if (response.evoCondition != undefined) {
        Embed.addFields({
          name: 'Evo condition',
          value: response.evoCondition,
          inline: true
        })
      }
      if (response.evoItem != undefined) {
        Embed.addFields({
          name: 'Evo item',
          value: response.evoItem,
          inline: true
        })
      }
      if (response.evos != undefined) {
        let evos = ''

        for (let i in response.evos) {
          evos += `${response.evos[i]}\n`
        }

        Embed.addFields({
          name: 'Evos',
          value: evos,
          inline: true
        })
      }
      if (response.otherFormes != undefined) {
        Embed.addFields({
          name: 'Other formes',
          value: response.otherFormes.join('\n'),
          inline: true
        })
      }

      if (response.cannotDynamax == undefined) {
        gmax = 'True'
      } else {
        gmax = 'False'
      }

      Embed.addFields({
        name: 'Can G-MAX',
        value: gmax,
        inline: true
      }, {
        name: 'Tier',
        value: response.tier,
        inline: true
      })

      return message.channel.send({ embeds: [Embed] })
    }
    script = await (await fetch('https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/')).text()

    eval(script)

    response = exports.BattleMovedex[args.join('').split('-').join('').toLowerCase()]

    if (response) {
      const Embed = new MessageEmbed()
        .setColor(client.config.botColor)
        .setTitle(`Name: ${args.join(' ').split('-').join(' ').toLowerCase()}, ID: ${response.num}`)
        .setDescription(response.shortDesc)
        .addFields({
          name: 'Type',
          value: response.type,
          inline: true
        }, {
          name: 'Category',
          value: response.category,
          inline: true
        }, {
          name: 'Base power',
          value: response.basePower,
          inline: true
        }, {
          name: 'Accuracy',
          value: response.accuracy,
          inline: true
        }, {
          name: 'PP',
          value: response.pp,
          inline: true
        }, {
          name: 'Priority',
          value: response.priority,
          inline: true
        })
      return message.channel.send({ embeds: [Embed] })
    }
    script = await (await fetch('https://play.pokemonshowdown.com/data/abilities.js?a222a0d9/')).text()

    eval(script)

    response = exports.BattleAbilities[args.join('').split('-').join('').toLowerCase()]

    if (response) {
      const Embed = new MessageEmbed()
        .setColor(client.config.botColor)
        .setTitle(`Name: ${response.name}, ID: ${response.num}`)
        .setDescription(response.shortDesc)
      return message.channel.send({ embeds: [Embed] })

    }

    script = await (await fetch('https://play.pokemonshowdown.com/data/items.js?3b87d391/')).text()

    eval(script)
    response = exports.BattleItems[args.join('').split('-').join('').toLowerCase()]

    if (response) {
      const Embed = new MessageEmbed()
        .setColor(client.config.botColor)
        .setTitle(`Name: ${response.name}, ID: ${response.num}`)
        .setDescription(response.shortDesc)
        .addFields({
          name: 'Fling base power',
          value: response.fling.basePower,
          inline: true
        })
      return message.channel.send({ embeds: [Embed] })
    }

    message.channel.send('Error :no_entry_sign:')
  }
}