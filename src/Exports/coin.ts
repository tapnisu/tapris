export const choices = ["сoin", "tail"];

export const flipCoin = (choices: string[]) =>
  choices[Math.floor(Math.random() * choices.length)];
