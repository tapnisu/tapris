import { calcWeaknesses } from "#lib/pokemonTypeChart.js";
import assert from "node:assert";
import { describe, test } from "node:test";

describe("pokedex calcWeaknesses function", () => {
  test("1 type", () => {
    assert.deepEqual(calcWeaknesses(["Normal"]), [
      { name: "Fighting", scale: 2 },
      { name: "Ghost", scale: 0 }
    ]);
  });

  test("2 types", () => {
    assert.deepEqual(calcWeaknesses(["Water", "Fairy"]), [
      { name: "Grass", scale: 2 },
      { name: "Electric", scale: 2 },
      { name: "Fire", scale: 0.5 },
      { name: "Water", scale: 0.5 },
      { name: "Ice", scale: 0.5 },
      { name: "Poison", scale: 2 },
      { name: "Fighting", scale: 0.5 },
      { name: "Bug", scale: 0.5 },
      { name: "Dragon", scale: 0.5 },
      { name: "Dark", scale: 0.5 }
    ]);
  });

  test("0x in results", () => {
    assert.deepEqual(calcWeaknesses(["Fire", "Flying"]), [
      { name: "Ground", scale: 0 },
      { name: "Rock", scale: 4 },
      { name: "Water", scale: 2 },
      { name: "Bug", scale: 0.25 },
      { name: "Steel", scale: 0.5 },
      { name: "Fire", scale: 0.5 },
      { name: "Grass", scale: 0.25 },
      { name: "Fairy", scale: 0.5 },
      { name: "Electric", scale: 2 },
      { name: "Fighting", scale: 0.5 }
    ]);
  });

  test("*0.5x in results", () => {
    assert.deepEqual(calcWeaknesses(["Water", "Dragon"]), [
      { name: "Steel", scale: 0.5 },
      { name: "Fire", scale: 0.25 },
      { name: "Water", scale: 0.25 },
      { name: "Dragon", scale: 2 },
      { name: "Fairy", scale: 2 }
    ]);
  });
});
