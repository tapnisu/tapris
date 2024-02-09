export const noPermission = "У тебя нет прав разблокировать участников!";
export const success = (userId: string) =>
  `<@!${userId}> был(а) разблокирован(а)!`;
export const failure = (userId: string) =>
  `<@!${userId}> не был(а) разблокирован(а)!`;
