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
  _: boolean;
}

const exports = {} as Exports;
exports._ = true;

eval(
  (await axios.get("https://play.pokemonshowdown.com/data/pokedex.js")).data
);
eval((await axios.get("https://play.pokemonshowdown.com/data/moves.js")).data);
eval(
  (await axios.get("https://play.pokemonshowdown.com/data/abilities.js")).data
);
eval((await axios.get("https://play.pokemonshowdown.com/data/items.js")).data);

export { exports };
