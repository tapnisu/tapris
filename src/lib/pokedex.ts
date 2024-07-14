import axios from "axios";

interface Exports {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BattlePokedex: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BattleMovedex: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BattleAbilities: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BattleItems: any;
}

const exports = {} as Exports;

eval(
  (await axios.get("https://play.pokemonshowdown.com/data/pokedex.js")).data
);
eval((await axios.get("https://play.pokemonshowdown.com/data/moves.js")).data);
eval(
  (await axios.get("https://play.pokemonshowdown.com/data/abilities.js")).data
);
eval((await axios.get("https://play.pokemonshowdown.com/data/items.js")).data);

export const BattlePokedex = exports.BattlePokedex;
export const BattleMovedex = exports.BattleMovedex;
export const BattleAbilities = exports.BattleAbilities;
export const BattleItems = exports.BattleItems;
