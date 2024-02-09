export const pokemon = {
  invalid: (name: string) => `${name} is not a valid pokemon!`,
  embedTitle: (name: string, id: number) => `Name: ${name}, ID: ${id}`,
  types: (types: string[]) => `Types: ${types.join(" / ")}`,

  height: "Height (m)",
  weight: "Weight (kg)",

  totalStats: "Total stats",

  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spAtk: "SP ATK",
  spDef: "SP DEF",
  speed: "SPEED",

  abilities: "Abilities",
  eggGroups: "Egg groups",
  weaknesses: "Weaknesses",
  prevo: "Previous evolution ",
  evoLevel: "Evolution Level",
  evoType: "Evolution type",
  evoCondition: "Evolution condition",
  evoItem: "Evolution item",
  evos: "Evolutions",
  forms: "Forms",
  canDynamax: "Can dynamax",
  yes: "Yes",
  tier: "Tier"
};

export const move = {
  invalid: (name: string) => `${name} is not a valid move!`,
  embedTitle: (name: string, id: number) => `Name: ${name}, ID: ${id}`,
  type: "Type",
  category: "Category",
  basePower: "Base power",
  accuracy: "Accuracy",
  pp: "PP",
  priority: "Priority"
};

export const ability = {
  invalid: (name: string) => `${name} is not a valid ability!`,
  embedTitle: (name: string, id: number) => `Name: ${name}, ID: ${id}`
};

export const item = {
  invalid: (name: string) => `${name} is not a valid item!`,
  embedTitle: (name: string, id: number) => `Name: ${name}, ID: ${id}`
};
