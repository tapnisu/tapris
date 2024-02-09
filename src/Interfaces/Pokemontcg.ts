export interface PokemontcgResponse {
  data: Datum[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface Datum {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: RetreatCost[];
  evolvesFrom: string;
  attacks: Attack[];
  weaknesses: Resistance[];
  retreatCost: RetreatCost[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: DatumImages;
  tcgplayer: Tcgplayer;
  cardmarket: Cardmarket;
  level?: string;
  resistances?: Resistance[];
  abilities?: Ability[];
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost: RetreatCost[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export enum RetreatCost {
  Colorless = "Colorless"
}

export interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: Record<string, number | null>;
}

export interface DatumImages {
  small: string;
  large: string;
}

export interface Legalities {
  unlimited: Expanded;
  expanded?: Expanded;
  standard?: Expanded;
}

export enum Expanded {
  Legal = "Legal"
}

export interface Resistance {
  type: string;
  value: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

export interface Prices {
  normal: The1_StEditionNormal;
  reverseHolofoil?: The1_StEditionNormal;
  "1stEditionNormal"?: The1_StEditionNormal;
}

export interface The1_StEditionNormal {
  low: number;
  mid: number;
  high: number;
  market: number | null;
  directLow: number | null;
}
