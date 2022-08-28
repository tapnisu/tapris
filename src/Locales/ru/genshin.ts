export const character = {
	invalid: (request: string) => `Персонаж ${request} не найден!`,
	rarity: "Редкость",
	nation: "Нация",
	affiliation: "Влияние",
	birthday: "День рождения",
	constellation: "Созвездие",
	element: "Элемент",
	weapontype: "Тип оружия",
	substat: "Дополнительная характеристика",
	version: "Версия"
};

export const weapon = {
	invalid: (request: string) => `Оружие ${request} не найденно!`,
	rarity: "Редкость",
	type: "Тип",
	baseatk: "Базовая атака",
	version: "Версия"
};

export const artifact = {
	invalid: (request: string) => `Артефакт ${request} не найден!`,
	rarity: "Редкость",
	pc2: "2 предмета",
	pc4: "4 предмета"
};
