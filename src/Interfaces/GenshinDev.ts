// Characters
export interface Character {
	name: string
	vision: string
	weapon: string
	nation: string
	affiliation: string
	rarity: number
	constellation: string
	birthday: string
	description: string
	skillTalents: SkillTalent[]
	passiveTalents: Constellation[]
	constellations: Constellation[]
	vision_key: string
	weapon_type: string
}

export interface Constellation {
	name: string
	unlock: string
	description: string
	level?: number
}

export interface SkillTalent {
	name: string
	unlock: string
	description: string
	upgrades: Upgrade[]
	type?: string
}

export interface Upgrade {
	name: string
	value: string
}

// Weapons
export interface Weapon {
	name: string
	type: string
	rarity: number
	baseAttack: number
	subStat: string
	passiveName: string
	passiveDesc: string
	location: string
}

// Artifacts
export interface Artifact {
	name: string
	max_rarity: number
	'2-piece_bonus': string
	'4-piece_bonus': string
}
