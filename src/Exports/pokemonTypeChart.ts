export type PokemonType =
	| "Normal"
	| "Fighting"
	| "Flying"
	| "Poison"
	| "Ground"
	| "Rock"
	| "Bug"
	| "Ghost"
	| "Steel"
	| "Fire"
	| "Water"
	| "Grass"
	| "Electric"
	| "Psychic"
	| "Ice"
	| "Dragon"
	| "Dark"
	| "Fairy";

export interface TypeChart {
	name: PokemonType;
	2: PokemonType[];
	0.5: PokemonType[];
	0: PokemonType[];
}

export const typeChart: TypeChart[] = [
	{
		name: "Normal",
		2: ["Fighting"],
		0.5: [],
		0: ["Ghost"]
	},
	{
		name: "Fighting",
		2: ["Flying", "Psychic", "Fairy"],
		0.5: ["Rock", "Bug", "Dark"],
		0: []
	},
	{
		name: "Flying",
		2: ["Rock", "Electric", "Ice"],
		0.5: ["Fighting", "Bug", "Grass"],
		0: ["Ground"]
	},
	{
		name: "Poison",
		2: ["Ground", "Psychic"],
		0.5: ["Fighting", "Poison", "Bug", "Grass", "Fairy"],
		0: []
	},
	{
		name: "Ground",
		2: ["Water", "Grass", "Ice"],
		0.5: ["Poison", "Rock"],
		0: ["Electric"]
	},
	{
		name: "Rock",
		2: ["Fighting", "Ground", "Steel", "Water", "Grass"],
		0.5: ["Normal", "Flying", "Poison", "Fire"],
		0: []
	},
	{
		name: "Bug",
		2: ["Flying", "Rock", "Fire"],
		0.5: ["Fighting", "Ground", "Grass"],
		0: []
	},
	{
		name: "Ghost",
		2: ["Ghost", "Dark"],
		0.5: ["Poison", "Bug"],
		0: ["Normal", "Fighting"]
	},
	{
		name: "Steel",
		2: ["Fighting", "Ground", "Fire"],
		0.5: [
			"Normal",
			"Flying",
			"Poison",
			"Rock",
			"Bug",
			"Steel",
			"Grass",
			"Psychic",
			"Ice",
			"Dragon",
			"Fairy"
		],
		0: ["Poison"]
	},
	{
		name: "Fire",
		2: ["Ground", "Rock", "Water"],
		0.5: ["Bug", "Steel", "Fire", "Grass", "Ice", "Fairy"],
		0: []
	},
	{
		name: "Water",
		2: ["Grass", "Electric"],
		0.5: ["Steel", "Fire", "Water", "Ice"],
		0: []
	},
	{
		name: "Grass",
		2: ["Flying", "Poison", "Bug", "Fire", "Ice"],
		0.5: ["Ground", "Water", "Grass", "Electric"],
		0: []
	},
	{
		name: "Electric",
		2: ["Ground"],
		0.5: ["Flying", "Steel", "Electric"],
		0: []
	},
	{
		name: "Psychic",
		2: ["Bug", "Ghost", "Dark"],
		0.5: ["Fighting", "Psychic"],
		0: []
	},
	{
		name: "Ice",
		2: ["Fighting", "Rock", "Steel", "Fire"],
		0.5: ["Ice"],
		0: []
	},
	{
		name: "Dragon",
		2: ["Ice", "Dragon", "Fairy"],
		0.5: ["Fire", "Water", "Grass", "Electric"],
		0: []
	},
	{
		name: "Dark",
		2: ["Fighting", "Bug", "Fairy"],
		0.5: ["Ghost", "Psychic", "Dark"],
		0: []
	},
	{
		name: "Fairy",
		2: ["Poison", "Steel"],
		0.5: ["Fighting", "Bug", "Dragon", "Dark"],
		0: []
	}
];

export interface Weaknesses {
	name: PokemonType;
	scale: number;
}

export function calcWeaknesses(pokemonTypes: PokemonType[]) {
	let weaknesses: Weaknesses[] = [];

	pokemonTypes.forEach((pokemonType: PokemonType) => {
		typeChart.forEach((typeTypeChart: TypeChart) => {
			if (typeTypeChart.name != pokemonType) return;

			typeTypeChart["2"].forEach((type: PokemonType) => {
				let existed = false;

				for (let i = 0; i < weaknesses.length; i++) {
					if (weaknesses[i].name == type) {
						weaknesses[i].scale *= 2;

						existed = true;
					}
				}

				if (!existed) weaknesses = [...weaknesses, { name: type, scale: 2 }];
			});

			typeTypeChart["0.5"].forEach((type: PokemonType) => {
				let existed = false;

				for (let i = 0; i < weaknesses.length; i++) {
					if (weaknesses[i].name == type) {
						weaknesses[i].scale *= 0.5;

						existed = true;
					}
				}

				if (!existed) weaknesses = [...weaknesses, { name: type, scale: 0.5 }];
			});

			typeTypeChart["0"].forEach((type: PokemonType) => {
				let existed = false;

				for (let i = 0; i < weaknesses.length; i++) {
					if (weaknesses[i].name == type) {
						weaknesses[i].scale *= 0;

						existed = true;
					}
				}

				if (!existed) weaknesses = [...weaknesses, { name: type, scale: 0 }];
			});
		});
	});

	weaknesses = weaknesses.filter((v) => v.scale != 1);

	return weaknesses;
}
