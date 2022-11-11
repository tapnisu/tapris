export const noPermission = "У тебя нет прав блокировать участников!";
export const lowerRole = "У цели роль выше твоей!";
export const success = (memberId: string) =>
	`<@!${memberId}> был(а) заблокирован(а)!`;
export const failure = (memberId: string) =>
	`<@!${memberId}> не был(а) заблокирован(а)!`;
