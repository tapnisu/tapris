export const noPermission = "У тебя нет прав выгонять участников!";
export const lowerRole = "У цели роль выше твоей!";
export const success = (memberId: string) =>
  `<@!${memberId}> был(а) выгнан(а)!`;
export const failure = (memberId: string) =>
  `<@!${memberId}> не был(а) выгнан(а)!`;
