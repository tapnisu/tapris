import { describe, expect, test } from "@jest/globals";
import { choices, flipCoin } from "../src/Exports/coin";

describe("sum module", () => {
	test("Result of flipCoin be in choices", () => {
		expect(choices).toContain(flipCoin(choices));
	});
});
