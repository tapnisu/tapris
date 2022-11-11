export const pokemon = {
	invalid: (name: string) => `Покемон ${name} не найден!`,
	embedTitle: (name: string, id: number) => `Имя: ${name}, ID: ${id}`,
	types: (types: string[]) => `Типы: ${types.join(" / ")}`,

	height: "Высота (m)",
	weight: "Вес (kg)",

	totalStats: "Общая статистика",

	hp: "Здоровье",
	atk: "Атака",
	def: "Защита",
	spAtk: "Специальная атака",
	spDef: "Специальная защита",
	speed: "Скорость",

	abilities: "Способности",
	eggGroups: "Группа яиц",
	weaknesses: "Слабости",
	prevo: "Предшествующая эволюция",
	evoLevel: "Уровень эволюции",
	evoType: "Тип эволюции",
	evoCondition: "Причина эволюции",
	evoItem: "Предмет для эволюции",
	evos: "Эволюции",
	forms: "Формы",
	canDynamax: "Может ли быть dynamax",
	yes: "Да",
	tier: "Ранг"
};

export const move = {
	invalid: (name: string) => `Атака ${name} не найдена!`,
	embedTitle: (name: string, id: number) => `Имя: ${name}, ID: ${id}`,
	type: "Тип",
	category: "Категория",
	basePower: "Базовая сила",
	accuracy: "Точность",
	pp: "PP",
	priority: "Приоритет"
};

export const ability = {
	invalid: (name: string) => `Способность ${name} не найдена!`,
	embedTitle: (name: string, id: number) => `Имя: ${name}, ID: ${id}`
};

export const item = {
	invalid: (name: string) => `Предмет ${name}  не найден!`,
	embedTitle: (name: string, id: number) => `Имя: ${name}, ID: ${id}`
};
