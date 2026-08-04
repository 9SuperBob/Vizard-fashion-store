import test from "node:test";
import assert from "node:assert/strict";
import { products } from "../src/data/storefrontData.js";

test("shared products provide the reusable product-card fields", () => {
  const requiredKeys = [
    "id",
    "slug",
    "name",
    "category",
    "price",
    "palette",
    "image",
    "sizes",
  ];

  for (const key of requiredKeys) {
    assert.ok(key in products[0], `products[0] includes ${key}`);
  }
});
