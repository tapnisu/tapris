export interface GIPNResponse {
  CODES: Code[];
}

export interface Code {
  period: string;
  code: string;
  expired: boolean;
  rewards: Reward[];
}

export interface Reward {
  reward: string;
  quantity: string;
}

export enum ImagePath {
  AdventurerExperience = "adventurer_experience",
  FineEnhancementOre = "fine_enhancement_ore",
  HeroWit = "hero_wit",
  Mora = "mora",
  MysticEnhancementOre = "mystic_enhancement_ore",
  Primogem = "primogem"
}

export enum Name {
  AdventurerSExperience = "Adventurer's Experience",
  FineEnhancementOre = "Fine Enhancement Ore",
  HeroSWit = "Hero's Wit",
  Mora = "Mora",
  MysticEnhancementOre = "Mystic Enhancement Ore",
  Primogems = "Primogems"
}

export enum Rarity {
  RarityFiveStar = "rarity_five_star",
  RarityFourStar = "rarity_four_star",
  RarityTreeStar = "rarity_tree_star",
  RarityTwoStar = "rarity_two_star"
}
