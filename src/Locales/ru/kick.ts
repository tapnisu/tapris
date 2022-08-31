export const noPermission = "У тебя нет прав выгонять участников!";
export const lowerRole = "У цели роль быше твоей!";
export const success = (memberId: string) =>
	`<@!${memberId}> был(а) выгнан(а)!`;
export const failure = (memberId: string) =>
	`<@!${memberId}> не был(а) выгнан(а)!`;
