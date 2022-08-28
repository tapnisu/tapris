export const character = {
	invalid: (request: string) => `${request} is not a valid character!`,
	rarity: "Rarity",
	nation: "Nation",
	affiliation: "Affiliation",
	birthday: "Birthday",
	constellation: "Constellation",
	element: "Element",
	weapontype: "Weapon type",
	substat: "Sub stat",
	version: "Version"
};

export const weapon = {
	invalid: (request: string) => `${request} is not a valid weapon!`,
	rarity: "Rarity",
	type: "Type",
	baseatk: "Base attack",
	version: "Version"
};

export const artifact = {
	invalid: (request: string) => `${request} is not a valid artifact!`,
	rarity: "Rarity",
	pc2: "2 piece bonus",
	pc4: "4 piece bonus"
};
