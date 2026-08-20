import { describe, expect, it } from "vitest";

import { resolveProfile } from "./index";

describe("resolveProfile — resolved (os 12 mapeamentos oficiais)", () => {
  it.each([
    ["red", "red_light", "RED_01"],
    ["red", "red_soft_fruity", "RED_02"],
    ["red", "red_balanced", "RED_03"],
    ["red", "red_intense", "RED_04"],
    ["white", "white_light_refreshing", "WHITE_01"],
    ["white", "white_aromatic_fruity", "WHITE_02"],
    ["white", "white_creamy_structured", "WHITE_03"],
    ["rose", "rose_dry_refreshing", "ROSE_01"],
    ["rose", "rose_fruity_refreshing", "ROSE_01"],
    ["sparkling", "sparkling_dry_refreshing", "SPARK_01"],
    ["sparkling", "sparkling_fruity_aromatic", "SPARK_02"],
    ["sparkling", "sparkling_sweet_aromatic", "SPARK_03"],
  ] as const)("%s + %s -> %s", (wineType, palateOptionId, expectedProfileId) => {
    const result = resolveProfile(wineType, palateOptionId);

    expect(result.status).toBe("resolved");
    expect(result.profileId).toBe(expectedProfileId);
  });
});

describe("resolveProfile — needs_help (nunca resolve para um perfil intermediário)", () => {
  it("wineType unknown, sem palateOptionId, retorna needs_help", () => {
    const result = resolveProfile("unknown", null);

    expect(result.status).toBe("needs_help");
    expect(result.profileId).toBeNull();
  });

  it.each([
    ["red", "red_unknown"],
    ["white", "white_unknown"],
    ["rose", "rose_unknown"],
    ["sparkling", "sparkling_unknown"],
  ] as const)("%s + %s retorna needs_help", (wineType, palateOptionId) => {
    const result = resolveProfile(wineType, palateOptionId);

    expect(result.status).toBe("needs_help");
    expect(result.profileId).toBeNull();
  });
});

describe("resolveProfile — invalid (combinações incompatíveis, sem correção silenciosa)", () => {
  it.each([
    ["red", "white_aromatic_fruity"],
    ["white", "red_light"],
    ["sparkling", "rose_dry_refreshing"],
    ["rose", "sparkling_dry_refreshing"],
    ["red", null],
  ] as const)("%s + %s retorna invalid", (wineType, palateOptionId) => {
    const result = resolveProfile(wineType, palateOptionId);

    expect(result.status).toBe("invalid");
    expect(result.profileId).toBeNull();
  });
});
