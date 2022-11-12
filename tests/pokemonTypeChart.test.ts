import { describe, expect, test } from "@jest/globals";
import { calcWeaknesses } from "../src/Exports/pokemonTypeChart";

describe("flipCoin function", () => {
	test("Result of flipCoin be in choices", () => {
		expect(calcWeaknesses(["Water", "Fairy"])).toBe();
	});
});
