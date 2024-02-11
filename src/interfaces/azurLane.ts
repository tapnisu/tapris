export interface AzurResponse {
  name_reference: string;
  cn_reference: string;
  nameJP: string;
  nameCN: string;
  ID: string;
  name: string;
  internal_id: string;
  rarity: string;
  initialStar: string;
  hull: string;
  navy: string;
  prefix: string;
  buildTime: string;
  class: string;
  voiceActress: string;
  parameters: Parameters;
  scrap: Scrap;
  releaseDate: ReleaseDate;
  artist: Artist;
  enhance: Enhance;
  acquisitionMethod: string;
  skill: Record<string, Skill>;
  skin: Record<string, AzurResponseSkin>;
  defaultEquipment: Record<string, DefaultEquipment>;
  stats: Stats;
  limitBreak: LimitBreak;
  equipmentLoadout: Record<string, EquipmentLoadout>;
  build: Build;
  drop: Drop;
  lines: Lines;
  fleet_tech: Record<string, string>;
}

export interface Artist {
  name: string;
  weibo: string;
  twitter: string;
  pixiv: string;
  other: string;
}

export interface Build {
  light: ReleaseDate;
  heavy: ReleaseDate;
  special: ReleaseDate;
  limited: ReleaseDate;
}

export interface ReleaseDate {
  JP: string;
  CN: string;
  EN: string;
  KR?: string;
}

export interface DefaultEquipment {
  icon: string;
  rarity: string;
  name: string;
}

export interface Drop {
  droppable: string;
  list: List;
}

export interface List {
  "1": List1;
}

export interface List1 {
  event: string;
  chapter: Chapter;
}

export interface Chapter {
  "1": Chapter1;
}

export interface Chapter1 {
  label: string;
  node: Node;
}

export interface Node {
  "1": Node1;
}

export interface Node1 {
  drop: string;
  note: string;
}

export interface Enhance {
  firepower: string;
  torpedo: string;
  aviation: string;
  reload: string;
}

export interface EquipmentLoadout {
  type: string;
  efficiency: string;
  amount: string;
  preload: string;
}

export interface LimitBreak {
  tier1: string;
  tier2: string;
  tier3: string;
}

export interface Lines {
  skin: Record<string, LinesSkin>;
}

export interface LinesSkin {
  skin_id: string;
  id: string;
  label: string;
  dialogue: Record<string, Dialogue>;
}

export interface Dialogue {
  event: string;
  media: string;
  chinese: string;
  chineseTL: string;
  chineseNote: string;
  japanese: string;
  japaneseTL: string;
  japaneseNote: string;
  english: string;
  englishNote: string;
}

export interface Parameters {
  firepower: string;
  torpedo: string;
  aviation: string;
  evasion: string;
  antiAir: string;
  hp: string;
}

export interface Scrap {
  gold: string;
  oil: string;
  medal: string;
}

export interface Skill {
  icon: string;
  requirement: string;
  name: string;
  type: string;
  description: string;
}

export interface AzurResponseSkin {
  id: string;
  name: string;
  description: string;
  expression: Record<string, Expression>;
}

export interface Expression {
  id: string;
}

export interface Stats {
  "100": Record<string, string>;
  "120": Record<string, string>;
  base: Record<string, string>;
  "100retrofit": Record<string, string>;
  "120retrofit": Record<string, string>;
}
