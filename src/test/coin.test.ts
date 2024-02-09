import assert from "node:assert";
import { describe, test } from "node:test";
import { choices, flipCoin } from "../lib/coin.js";

describe("flipCoin function", () => {
  test("Result of flipCoin be in choices", () => {
    assert.equal(choices.includes(flipCoin(choices)), true);
  });
});
