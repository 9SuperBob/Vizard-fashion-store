import test from "node:test";
import assert from "node:assert/strict";

test("imports route constants", async () => {
  const { routes } = await import("../src/utils/routes.js");

  assert.equal(routes.home, "#/");
});
